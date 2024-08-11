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
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Ticket } from './domain/ticket';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllTicketsDto } from './dto/find-all-tickets.dto';
import { exceptionResponses } from 'src/tickets/tickets.messages';
import { getPagination } from 'src/utils/get-pagination';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'tickets',
  version: '1',
})
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

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

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Ticket,
  })
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(id, updateTicketDto);
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
}
