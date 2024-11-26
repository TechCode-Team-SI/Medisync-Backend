import { InjectQueue } from '@nestjs/bullmq';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Queue } from 'bullmq';
import { AgendaRepository } from 'src/agendas/infrastructure/persistence/agenda.repository';
import { FilesService } from 'src/files/files.service';
import { MessagesContent } from 'src/notifications/messages.notifications';
import { PermissionsEnum } from 'src/permissions/permissions.enum';
import { RequestTemplate } from 'src/request-templates/domain/request-template';
import { RequestTemplatesService } from 'src/request-templates/request-templates.service';
import { RequestStatusEnum } from 'src/requests/requests.enum';
import { RequestsService } from 'src/requests/requests.service';
import { UsersService } from 'src/users/users.service';
import { NotificationQueueOperations, QueueName } from 'src/utils/queue-enum';
import { findOptions } from 'src/utils/types/fine-options.type';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Specialty } from './domain/specialty';
import { CreateMultipleSpecialtyInternalDto } from './dto/create-multiple-specialty-internal.dto';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import {
  FilterSpecialtyDto,
  SortSpecialtyDto,
} from './dto/find-all-specialties.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { SpecialtyRepository } from './infrastructure/persistence/specialty.repository';
import { exceptionResponses } from './specialties.messages';

@Injectable()
export class SpecialtiesService {
  constructor(
    private readonly specialtyRepository: SpecialtyRepository,
    private readonly filesService: FilesService,
    private readonly usersService: UsersService,
    private readonly requestTemplateService: RequestTemplatesService,
    private readonly requestsService: RequestsService,
    private readonly agendasRepository: AgendaRepository,
    @InjectQueue(QueueName.NOTIFICATION) private notificationQueue: Queue,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    if (createSpecialtyDto.image?.id) {
      const fileObject = await this.filesService.findById(
        createSpecialtyDto.image.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.ImageNotExist,
        );
      }
      createSpecialtyDto.image = fileObject;
    }

    let foundRequestTemplate: RequestTemplate | null = null;
    if (createSpecialtyDto.requestTemplate) {
      foundRequestTemplate = await this.requestTemplateService.findOne(
        createSpecialtyDto.requestTemplate.id,
      );
      if (!foundRequestTemplate) {
        throw new UnprocessableEntityException(
          exceptionResponses.RequestTemplateNotExists,
        );
      }
    }
    const result = await this.specialtyRepository.create({
      ...createSpecialtyDto,
      requestTemplate: foundRequestTemplate,
    });
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.specialty.created.title,
          content: MessagesContent.specialty.created.content(result.id),
          type: MessagesContent.specialty.created.type,
        },
        permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
      },
    );
    return result;
  }

  async createMultiple({ specialties }: CreateMultipleSpecialtyInternalDto) {
    const payloads = await Promise.all(
      specialties.map(async (specialty) => {
        const data = { ...specialty };
        if (data.image?.id) {
          const fileObject = await this.filesService.findById(data.image.id);
          if (!fileObject) {
            throw new UnprocessableEntityException(
              exceptionResponses.ImageNotExist,
            );
          }
          data.image = fileObject;
        }

        let foundRequestTemplate: RequestTemplate | null = null;
        if (data.requestTemplate) {
          foundRequestTemplate = await this.requestTemplateService.findOne(
            data.requestTemplate.id,
          );
          if (!foundRequestTemplate) {
            throw new UnprocessableEntityException(
              exceptionResponses.RequestTemplateNotExists,
            );
          }
        }
        return {
          ...data,
          requestTemplate: foundRequestTemplate,
        };
      }),
    );

    return this.specialtyRepository.createMultiple(payloads);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    filterOptions,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    filterOptions?: (FilterSpecialtyDto & { userId?: string }) | null;
    sortOptions?: SortSpecialtyDto[] | null;
  }) {
    let filterOpts: FilterSpecialtyDto = {};

    if (filterOptions?.userId) {
      const foundUser = await this.usersService.findById(filterOptions.userId, {
        withProfile: true,
      });
      if (!foundUser) {
        throw new UnprocessableEntityException(
          exceptionResponses.UserNotExists,
        );
      }
      if (!foundUser.employeeProfile) {
        throw new UnprocessableEntityException(
          exceptionResponses.UserNotSpecialist,
        );
      }
      filterOpts = { employeeProfileIds: [foundUser.employeeProfile.id] };
    }
    if (filterOptions?.search)
      filterOpts = { ...filterOpts, search: filterOptions.search };
    if (
      filterOptions?.isDisabled !== null &&
      filterOptions?.isDisabled !== undefined
    ) {
      filterOpts = { ...filterOpts, isDisabled: filterOptions.isDisabled };
    }

    return this.specialtyRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      filterOptions: filterOpts,
      sortOptions,
    });
  }

  async findAllActiveWithPagination({
    paginationOptions,
    isPublic,
  }: {
    paginationOptions: IPaginationOptions;
    isPublic?: boolean;
  }) {
    return this.specialtyRepository.findAllActiveWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      isPublic,
    });
  }

  findOne(id: Specialty['id'], options?: findOptions) {
    return this.specialtyRepository.findById(id, options);
  }

  findAllWithNames(names: Specialty['name'][], options?: findOptions) {
    return this.specialtyRepository.findAllWithNames(names, options);
  }

  async update(id: Specialty['id'], updateSpecialtyDto: UpdateSpecialtyDto) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.specialty.updated.title,
          content: MessagesContent.specialty.updated.content(id),
          type: MessagesContent.specialty.updated.type,
        },
        permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
      },
    );
    return this.specialtyRepository.update(id, updateSpecialtyDto);
  }

  async remove(id: Specialty['id']) {
    await this.notificationQueue.add(
      NotificationQueueOperations.CREATE_FOR_USERS_BY_PERMISSIONS,
      {
        payload: {
          title: MessagesContent.specialty.remove.title,
          content: MessagesContent.specialty.remove.content(id),
          type: MessagesContent.specialty.created.type,
        },
        permissions: [PermissionsEnum.MANAGE_SPECIALTIES],
      },
    );
    return this.specialtyRepository.remove(id);
  }

  isUserInSpecialty(id: string): Promise<boolean> {
    return this.specialtyRepository.isUserInSpecialty(id);
  }

  async updateSpecialtyTemplate(
    specialtyId: string,
    requestTemplateId: string,
  ) {
    const specialty = await this.specialtyRepository.findById(specialtyId);
    if (!specialty) {
      throw new UnprocessableEntityException(exceptionResponses.NotFound);
    }
    const requestTemplate =
      await this.requestTemplateService.findOne(requestTemplateId);
    if (!requestTemplate) {
      throw new UnprocessableEntityException(
        exceptionResponses.RequestTemplateNotExists,
      );
    }

    await this.requestsService.updateStatusBySpecialty(
      specialtyId,
      RequestStatusEnum.CANCELLED,
    );

    return this.specialtyRepository.update(specialtyId, {
      requestTemplate: {
        id: requestTemplateId,
      },
    });
  }

  async updateSpecialtyAgenda(specialtyId: string, agendaId?: string | null) {
    const specialty = await this.specialtyRepository.findById(specialtyId);
    if (!specialty) {
      throw new UnprocessableEntityException(exceptionResponses.NotFound);
    }
    if (agendaId) {
      const agenda = await this.agendasRepository.findById(agendaId);
      if (!agenda) {
        throw new UnprocessableEntityException(
          exceptionResponses.AgendaNotExist,
        );
      }
      return this.specialtyRepository.update(specialty.id, {
        agenda,
      });
    } else {
      return this.specialtyRepository.update(specialty.id, {
        agenda: null,
      });
    }
  }
}
