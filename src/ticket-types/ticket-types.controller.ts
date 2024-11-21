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
import { TicketTypesService } from './ticket-types.service';
import { CreateTicketTypeDto } from './dto/create-ticket-type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket-type.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TicketType } from './domain/ticket-type';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllTicketTypesDto } from './dto/find-all-ticket-types.dto';
import { exceptionResponses } from 'src/ticket-types/ticket-types.messages';
import { getPagination } from 'src/utils/get-pagination';

@ApiTags('Ticket-types')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'ticket-types',
  version: '1',
})
export class TicketTypesController {
  constructor(private readonly ticketTypesService: TicketTypesService) {}

  @Post()
  @ApiCreatedResponse({
    type: TicketType,
  })
  create(@Body() createTicketTypeDto: CreateTicketTypeDto) {
    return this.ticketTypesService.create(createTicketTypeDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(TicketType),
  })
  async findAll(
    @Query() query: FindAllTicketTypesDto,
  ): Promise<PaginationResponseDto<TicketType>> {
    const paginationOptions = getPagination(query);

    return this.ticketTypesService.findAllWithPagination({
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
    type: TicketType,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.ticketTypesService.findOne(id);

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
    type: TicketType,
  })
  update(
    @Param('id') id: string,
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
  ) {
    return this.ticketTypesService.update(id, updateTicketTypeDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.ticketTypesService.remove(id);
  }
}
