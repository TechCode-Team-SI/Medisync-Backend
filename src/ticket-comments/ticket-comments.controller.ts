import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { TicketCommentsService } from './ticket-comments.service';
import { CreateTicketCommentDto } from './dto/create-ticket-comment.dto';
import { UpdateTicketCommentDto } from './dto/update-ticket-comment.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TicketComment } from './domain/ticket-comment';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllTicketCommentsDto } from './dto/find-all-ticket-comments.dto';
import { exceptionResponses } from 'src/ticket-comments/ticket-comments.messages';
import { getPagination } from 'src/utils/get-pagination';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';

@ApiTags('Ticketcomments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ticket-comments',
  version: '1',
})
export class TicketCommentsController {
  constructor(private readonly ticketCommentsService: TicketCommentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: TicketComment,
  })
  create(
    @Me() userPayload: JwtPayloadType,
    @Body() createTicketCommentDto: CreateTicketCommentDto,
  ) {
    const { id: createdBy } = userPayload;
    return this.ticketCommentsService.create(createTicketCommentDto, createdBy);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(TicketComment),
  })
  async findAll(
    @Query() query: FindAllTicketCommentsDto,
  ): Promise<PaginationResponseDto<TicketComment>> {
    const paginationOptions = getPagination(query);

    return this.ticketCommentsService.findAllWithPagination({
      paginationOptions,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: TicketComment,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.ticketCommentsService.findOne(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return entity;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: TicketComment,
  })
  update(
    @Param('id') id: string,
    @Body() updateTicketCommentDto: UpdateTicketCommentDto,
  ) {
    return this.ticketCommentsService.update(id, updateTicketCommentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.ticketCommentsService.remove(id);
  }
}
