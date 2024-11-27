import { InjectQueue } from '@nestjs/bullmq';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Queue } from 'bullmq';
import {
  FilterAgendaDto,
  SortAgendasDto,
} from 'src/agendas/dto/find-all-agendas.dto';
import { DaysOff } from 'src/days-offs/domain/days-off';
import { EmployeeProfileRepository } from 'src/employee-profiles/infrastructure/persistence/employee-profile.repository';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { UserRepository } from 'src/users/infrastructure/persistence/user.repository';
import { NotificationQueueOperations, QueueName } from 'src/utils/queue-enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { exceptionResponses } from './agendas.messages';
import { Agenda } from './domain/agenda';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { AgendaRepository } from './infrastructure/persistence/agenda.repository';
import { AgendaMapper } from './infrastructure/persistence/relational/mappers/agenda.mapper';

@Injectable()
export class AgendasService {
  constructor(
    private readonly agendaRepository: AgendaRepository,
    private readonly specialtiesService: SpecialtiesService,
    private readonly employeesRepository: EmployeeProfileRepository,
    private readonly userRepository: UserRepository,
    @InjectQueue(QueueName.NOTIFICATION) private notificationQueue: Queue,
  ) {}

  async create(createAgendaDto: CreateAgendaDto) {
    const payload = {
      ...createAgendaDto,
      weekdays: createAgendaDto.weekdays.split('_'),
      daysOffs: createAgendaDto.daysOffs?.map((day) => {
        const dayOff = new DaysOff();
        dayOff.from = day.from;
        dayOff.to = day.to;
        return dayOff;
      }),
    };

    const result = await this.agendaRepository.create(payload);
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.agenda.created.title,
          content: MessagesContent.agenda.created.content(result.id),
          type: MessagesContent.agenda.created.type,
        },
        permissions: [PermissionsEnum.MANAGE_AGENDA],
      },
    );
    return result;
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortAgendasDto[] | null;
    filterOptions?: FilterAgendaDto | null;
  }) {
    return this.agendaRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  async findOneByEntity(id: string, type: 'user' | 'specialty') {
    const agendaId = await this.getEntityAgendaId(id, type);
    return this.agendaRepository.findById(agendaId);
  }

  findOne(id: Agenda['id'], options?: findOptions) {
    return this.agendaRepository.findById(id, options);
  }

  async findSlottedTimes(id: string, type: 'user' | 'specialty') {
    const agenda = await this.findOneByEntity(id, type);

    if (!agenda) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    return AgendaMapper.toDomainSlotted(agenda);
  }

  async getEntityAgendaId(id: string, type: 'user' | 'specialty') {
    switch (type) {
      case 'user':
        const user = await this.userRepository.findById(id, {
          withProfile: true,
        });
        if (!user) {
          throw new NotFoundException(exceptionResponses.UserNotExist);
        }
        if (!user.employeeProfile?.agenda) {
          throw new NotFoundException(exceptionResponses.NotFound);
        }
        return user.employeeProfile.agenda.id;
      default:
        const specialty = await this.specialtiesService.findOne(id);
        if (!specialty) {
          throw new NotFoundException(exceptionResponses.SpecialtyNotExists);
        }
        if (!specialty.agenda) {
          throw new NotFoundException(exceptionResponses.NotFound);
        }
        return specialty.agenda.id;
    }
  }

  async update(id: Agenda['id'], updateAgendaDto: UpdateAgendaDto) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.agenda.updated.title,
          content: MessagesContent.agenda.updated.content(id),
          type: MessagesContent.agenda.updated.type,
        },
        permissions: [PermissionsEnum.MANAGE_AGENDA],
      },
    );
    return this.agendaRepository.update(id, {
      ...updateAgendaDto,
      weekdays: updateAgendaDto.weekdays?.split('_'),
      daysOffs: updateAgendaDto.daysOffs?.map((day) => {
        const dayOff = new DaysOff();
        if (day.id) {
          dayOff.id = day.id;
        }
        dayOff.from = day.from;
        dayOff.to = day.to;
        return dayOff;
      }),
    });
  }

  async remove(id: Agenda['id']) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.agenda.remove.title,
          content: MessagesContent.agenda.remove.content(id),
          type: MessagesContent.agenda.remove.type,
        },
        permissions: [PermissionsEnum.MANAGE_AGENDA],
      },
    );
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
