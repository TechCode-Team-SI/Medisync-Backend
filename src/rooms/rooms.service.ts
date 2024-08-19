import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomRepository } from './infrastructure/persistence/room.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Room } from './domain/room';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepository: RoomRepository) {}

  create(createRoomDto: CreateRoomDto) {
    return this.roomRepository.create(createRoomDto);
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
