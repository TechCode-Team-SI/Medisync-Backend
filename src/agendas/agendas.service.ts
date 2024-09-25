import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { AgendaRepository } from './infrastructure/persistence/agenda.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Agenda } from './domain/agenda';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortAgendasDto } from 'src/agendas/dto/find-all-agendas.dto';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { exceptionResponses } from './agendas.messages';
import { EmployeeProfileRepository } from 'src/employee-profiles/infrastructure/persistence/employee-profile.repository';

@Injectable()
export class AgendasService {
  constructor(
    private readonly agendaRepository: AgendaRepository,
    private readonly specialtiesService: SpecialtiesService,
    private readonly employeesRepository: EmployeeProfileRepository,
  ) {}

  create(createAgendaDto: CreateAgendaDto) {
    return this.agendaRepository.create(createAgendaDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortAgendasDto[] | null;
  }) {
    return this.agendaRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: Agenda['id'], options?: findOptions) {
    return this.agendaRepository.findById(id, options);
  }

  update(id: Agenda['id'], updateAgendaDto: UpdateAgendaDto) {
    return this.agendaRepository.update(id, updateAgendaDto);
  }

  remove(id: Agenda['id']) {
    return this.agendaRepository.remove(id);
  }

  async updateSpecialtyAgenda(id: Agenda['id'], specialtyId: string) {
    const agenda = await this.findOne(id);
    if (!agenda) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const specialty = await this.specialtiesService.findOne(specialtyId);
    if (!specialty) {
      throw new NotFoundException(exceptionResponses.SpecialtyNotExists);
    }
    if (!specialty.isGroup) {
      throw new UnprocessableEntityException(
        exceptionResponses.SpecialtyIsNotGroup,
      );
    }

    specialty.agenda = agenda;
    await this.specialtiesService.update(specialty.id, specialty);
    return agenda;
  }

  async updateEmployeeAgenda(id: Agenda['id'], employeeId: string) {
    const agenda = await this.findOne(id);
    if (!agenda) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const employee = await this.employeesRepository.findById(employeeId);
    if (!employee) {
      throw new NotFoundException(exceptionResponses.EmployeeNotExists);
    }

    employee.agenda = agenda;
    await this.employeesRepository.update(employee.id, employee);
    return agenda;
  }
}
