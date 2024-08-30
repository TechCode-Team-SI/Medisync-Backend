import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { TicketComment } from 'src/ticket-comments/domain/ticket-comment';
import { CreateTicketCommentDto } from 'src/ticket-comments/dto/create-ticket-comment.dto';
import { FindAllTicketCommentsDto } from 'src/ticket-comments/dto/find-all-ticket-comments.dto';
import { TicketCommentsService } from 'src/ticket-comments/ticket-comments.service';
import { exceptionResponses } from 'src/tickets/tickets.messages';
import { getPagination } from 'src/utils/get-pagination';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { Ticket } from './domain/ticket';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { FindAllTicketsDto } from './dto/find-all-tickets.dto';
import { TicketsService } from './tickets.service';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'tickets',
  version: '1',
})
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly ticketCommentsService: TicketCommentsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: Ticket,
  })
  create(
    @Me() userPayload: JwtPayloadType,
    @Body() createTicketDto: CreateTicketDto,
  ) {
    const { id: createdBy } = userPayload;
    return this.ticketsService.create(createTicketDto, createdBy);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Ticket),
  })
  async findAll(
    @Query() query: FindAllTicketsDto,
  ): Promise<PaginationResponseDto<Ticket>> {
    const paginationOptions = getPagination(query);
    const type = query.type;

    return this.ticketsService.findAllWithPagination({
      paginationOptions,
      type,
    });
  }

  @Get('me')
  @ApiOkResponse({
    type: PaginationResponse(Ticket),
  })
  async findAllMine(
    @Me() userPayload: JwtPayloadType,
    @Query() query: FindAllTicketsDto,
  ): Promise<PaginationResponseDto<Ticket>> {
    const paginationOptions = getPagination(query);
    const type = query.type;

    return this.ticketsService.findAllWithPagination({
      paginationOptions,
      type,
      createdById: userPayload.id,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Ticket,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.ticketsService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Post('close/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Ticket,
  })
  update(@Param('id') id: string) {
    return this.ticketsService.close(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.ticketsService.remove(id);
  }

  @Post('comments/:ticketId')
  @ApiCreatedResponse({
    type: TicketComment,
  })
  comment(
    @Me() userPayload: JwtPayloadType,
    @Param('ticketId') ticketId: string,
    @Body() { comment }: CreateTicketCommentDto,
  ) {
    const { id: createdBy } = userPayload;
    return this.ticketCommentsService.create({ comment, ticketId }, createdBy);
  }

  @Get('comments/:ticketId')
  @ApiOkResponse({
    type: PaginationResponse(TicketComment),
  })
  async findAllComments(
    @Param('ticketId') ticketId: string,
    @Query() query: FindAllTicketCommentsDto,
  ): Promise<PaginationResponseDto<TicketComment>> {
    const paginationOptions = getPagination(query);

    return this.ticketCommentsService.findAllWithPagination({
      paginationOptions,
      ticketId,
    });
  }
}
