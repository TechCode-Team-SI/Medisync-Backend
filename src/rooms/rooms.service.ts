import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { EmployeeProfilesService } from 'src/employee-profiles/employee-profiles.service';
import { RoomRepository } from './infrastructure/persistence/room.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Room } from './domain/room';
import { exceptionResponses } from './rooms.messages';
import { findOptions } from 'src/utils/types/fine-options.type';

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
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.roomRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: Room['id'], options?: findOptions) {
    return this.roomRepository.findById(id, options);
  }

  update(id: Room['id'], updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(id, updateRoomDto);
  }

  remove(id: Room['id']) {
    return this.roomRepository.remove(id);
  }
}
