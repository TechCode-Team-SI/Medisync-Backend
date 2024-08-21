//import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { SpecialtiesService } from 'src/specialties/specialties.service';
import { UsersService } from 'src/users/users.service';
import { RoomRepository } from './infrastructure/persistence/room.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Room } from './domain/room';
//import { exceptionResponses } from './rooms.messages';
import { findOptions } from 'src/utils/types/fine-options.type';
import { UserRepository } from 'src/users/infrastructure/persistence/user.repository';
import { EmployeeProfileEntity } from 'src/users/infrastructure/persistence/relational/entities/employee-profile.entity';
import { SpecialtyDto } from 'src/specialties/dto/specialty.dto';
import { EmployeeProfileDto } from 'src/users/dto/employee-profile.dto';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly specialtyService: SpecialtiesService,
    private readonly userService: UsersService,
    private readonly usersRepository: UserRepository,
    private readonly employeeProfileEntity: EmployeeProfileEntity,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    /*const clonedPayload = {
      ...createRoomDto,
    };

    if (clonedPayload.specialty) {
      const specialtyObject = await this.specialtyService.findOne(
        clonedPayload.specialty.id,
      );

      if (!specialtyObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.SpecialtyNotExist,
        );
      }
    }

    const specialty = clonedPayload.specialty || undefined;
    const employeeProfile;*/

    return this.roomRepository.create(
      createRoomDto,
      null || new SpecialtyDto(),
      null || new EmployeeProfileDto(),
    );
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
