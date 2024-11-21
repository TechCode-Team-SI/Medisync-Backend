import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { EmployeeProfilesService } from 'src/employee-profiles/employee-profiles.service';
import { RoomRepository } from './infrastructure/persistence/room.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Room } from './domain/room';
import { exceptionResponses } from './rooms.messages';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DeepPartial } from '../utils/types/deep-partial.type';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { EmployeeProfileIdDto } from 'src/employee-profiles/dto/employee-profile-id.dto';
import { FilterRoomsDto } from './dto/find-all-rooms.dto';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly specialtyService: SpecialtiesService,
    private readonly employeeProfilesService: EmployeeProfilesService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    const clonedPayload = {
      ...createRoomDto,
    };

    if (clonedPayload.specialty && clonedPayload.employeeProfile) {
      throw new UnprocessableEntityException(
        exceptionResponses.UsingEmployeeAndSpecialty,
      );
    }

    if (clonedPayload.specialty) {
      const foundSpecialty = await this.specialtyService.findOne(
        clonedPayload.specialty.id,
      );

      if (!foundSpecialty) {
        throw new UnprocessableEntityException(
          exceptionResponses.SpecialtyNotExist,
        );
      }
    }

    if (clonedPayload.employeeProfile) {
      const employeeProfileFound = await this.employeeProfilesService.findOne(
        clonedPayload.employeeProfile.id,
      );

      if (!employeeProfileFound) {
        throw new UnprocessableEntityException(
          exceptionResponses.EmployeeProfileNotExist,
        );
      }
    }

    return this.roomRepository.create(clonedPayload);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    filterOptions?: FilterRoomsDto | null;
  }) {
    return this.roomRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      filterOptions,
    });
  }

  findOne(id: Room['id'], options?: findOptions) {
    return this.roomRepository.findById(id, options);
  }

  async update(
    id: Room['id'],
    payload: DeepPartial<Room>,
  ): Promise<Room | null> {
    if (payload.specialty && payload.employeeProfile) {
      throw new UnprocessableEntityException(
        exceptionResponses.UsingEmployeeAndSpecialty,
      );
    }

    let existSpecialty: SpecialtyDto | undefined = undefined;
    let existEmployeeProfile: EmployeeProfileIdDto | undefined = undefined;
    if (payload.specialty?.id) {
      const foundSpecialty = await this.specialtyService.findOne(
        payload.specialty.id,
      );

      if (!foundSpecialty) {
        throw new UnprocessableEntityException(
          exceptionResponses.SpecialtyNotExist,
        );
      }
      existSpecialty = foundSpecialty;
      existEmployeeProfile = undefined;
    }

    if (payload.employeeProfile?.id) {
      const employeeProfileFound = await this.employeeProfilesService.findOne(
        payload.employeeProfile.id,
      );

      if (!employeeProfileFound) {
        throw new UnprocessableEntityException(
          exceptionResponses.EmployeeProfileNotExist,
        );
      }
      existSpecialty = undefined;
      existEmployeeProfile = employeeProfileFound;
    }

    const clonedPayload = {
      ...payload,
      specialty: existSpecialty,
      employeeProfile: existEmployeeProfile,
    };

    return this.roomRepository.update(id, clonedPayload);
  }

  remove(id: Room['id']) {
    return this.roomRepository.remove(id);
  }
}
