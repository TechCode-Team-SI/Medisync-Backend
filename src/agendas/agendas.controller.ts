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
import { AgendasService } from './agendas.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Agenda } from './domain/agenda';
import { AuthGuard } from '@nestjs/passport';
import {
  PaginationResponse,
  PaginationResponseDto,
} from '../utils/dto/pagination-response.dto';
import { FindAllAgendasDto } from './dto/find-all-agendas.dto';
import { exceptionResponses } from 'src/agendas/agendas.messages';
import { getPagination } from 'src/utils/get-pagination';
import { EmployeeOnlyGuard } from 'src/common/employee-only.guard';

@ApiTags('Agendas')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@UseGuards(EmployeeOnlyGuard)
@Controller({
  path: 'agendas',
  version: '1',
})
export class AgendasController {
  constructor(private readonly agendasService: AgendasService) {}

  @Post()
  @ApiCreatedResponse({
    type: Agenda,
  })
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.agendasService.create(createAgendaDto);
  }

  @Get()
  @ApiOkResponse({
    type: PaginationResponse(Agenda),
  })
  async findAll(
    @Query() query: FindAllAgendasDto,
  ): Promise<PaginationResponseDto<Agenda>> {
    const paginationOptions = getPagination(query);

    return this.agendasService.findAllWithPagination({
      paginationOptions,
      sortOptions: query.sort,
      filterOptions: query.filters,
    });
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Agenda,
  })
  async findOne(@Param('id') id: string) {
    const entity = await this.agendasService.findOne(id);

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
    type: Agenda,
  })
  update(@Param('id') id: string, @Body() updateAgendaDto: UpdateAgendaDto) {
    return this.agendasService.update(id, updateAgendaDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.agendasService.remove(id);
  }

  @Post('specialty/:id/:specialtyId')
  @ApiParam({
    name: 'specialtyId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Agenda,
  })
  updateSpecialtyAgenda(
    @Param('specialtyId') specialtyId: string,
    @Param('id') id: string,
  ) {
    return this.agendasService.updateSpecialtyAgenda(id, specialtyId);
  }

  @Post('employee/:id/:employeeId')
  @ApiParam({
    name: 'employeeId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Agenda,
  })
  updateEmployeeAgenda(
    @Param('employeeId') employeeId: string,
    @Param('id') id: string,
  ) {
    return this.agendasService.updateEmployeeAgenda(id, employeeId);
  }
}
