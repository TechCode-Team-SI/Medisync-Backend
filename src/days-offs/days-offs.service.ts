import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { AgendaRepository } from 'src/agendas/infrastructure/persistence/agenda.repository';
import {
  FilterDaysOffsDto,
  SortDaysOffsDto,
} from 'src/days-offs/dto/find-all-days-offs.dto';
import { EmployeeProfileRepository } from 'src/employee-profiles/infrastructure/persistence/employee-profile.repository';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { exceptionResponses } from './days-offs.messages';
import { DaysOff } from './domain/days-off';
import { CreateDaysOffDto } from './dto/create-days-off.dto';
import { UpdateDaysOffDto } from './dto/update-days-off.dto';
import { DaysOffRepository } from './infrastructure/persistence/days-off.repository';
import { SpecialtyRepository } from 'src/specialties/infrastructure/persistence/specialty.repository';

@Injectable()
export class DaysOffsService {
  constructor(
    private readonly daysOffRepository: DaysOffRepository,
    private readonly agendaRepository: AgendaRepository,
    private readonly employeeProfileRepository: EmployeeProfileRepository,
    private readonly specialtyRepository: SpecialtyRepository,
  ) {}

  async create(
    createDaysOffDto: CreateDaysOffDto,
    type: 'employee' | 'agenda' | 'specialty',
    target: string,
  ) {
    switch (type) {
      case 'employee':
        const employee = await this.employeeProfileRepository.findById(target);
        if (!employee) {
          throw new UnprocessableEntityException(
            exceptionResponses.EmployeeNotExists,
          );
        }
        return this.daysOffRepository.create({
          ...createDaysOffDto,
          employeeProfile: employee,
        });
      case 'agenda':
        const agenda = await this.agendaRepository.findById(target);
        if (!agenda) {
          throw new UnprocessableEntityException(
            exceptionResponses.AgendaNotExists,
          );
        }
        return this.daysOffRepository.create({
          ...createDaysOffDto,
          agenda,
        });
      case 'specialty':
        const specialty = await this.specialtyRepository.findById(target);
        if (!specialty) {
          throw new UnprocessableEntityException(
            exceptionResponses.AgendaNotExists,
          );
        }
        return this.daysOffRepository.create({
          ...createDaysOffDto,
          specialty,
        });
      default:
        throw new UnprocessableEntityException(exceptionResponses.InvalidType);
    }
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortDaysOffsDto[] | null;
    filterOptions?: FilterDaysOffsDto | null;
  }) {
    return this.daysOffRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findAllDaysOffs(props: {
    employeeProfileId?: string | null;
    agendaId?: string | null;
    specialtyId?: string | null;
    startDate: Date;
    endDate: Date;
  }): Promise<string[]> {
    return this.daysOffRepository.findAllDaysOffs(props);
  }

  findOne(id: DaysOff['id'], options?: findOptions) {
    return this.daysOffRepository.findById(id, options);
  }

  update(id: DaysOff['id'], updateDaysOffDto: UpdateDaysOffDto) {
    return this.daysOffRepository.update(id, updateDaysOffDto);
  }

  remove(id: DaysOff['id']) {
    return this.daysOffRepository.remove(id);
  }
}
