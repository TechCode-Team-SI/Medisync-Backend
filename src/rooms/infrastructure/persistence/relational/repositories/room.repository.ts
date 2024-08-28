import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/rooms/rooms.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Room } from '../../../../domain/room';
import { RoomRepository } from '../../room.repository';
import { RoomEntity } from '../entities/room.entity';
import { RoomMapper } from '../mappers/room.mapper';

@Injectable({ scope: Scope.REQUEST })
export class RoomRelationalRepository
  extends BaseRepository
  implements RoomRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get roomRepository(): Repository<RoomEntity> {
    return this.getRepository(RoomEntity);
  }

  private relations: FindOptionsRelations<RoomEntity> = {
    specialty: true,
    employeeProfile: true,
  };

  async create(data: Room): Promise<Room> {
    const persistenceModel = RoomMapper.toPersistence(data);
    const newEntity = await this.roomRepository.save(
      this.roomRepository.create(persistenceModel),
    );
    return RoomMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Room>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.roomRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => RoomMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'rooms',
      },
    );
  }

  async findById(
    id: Room['id'],
    options?: findOptions,
  ): Promise<NullableType<Room>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.roomRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RoomMapper.toDomain(entity) : null;
  }

  async update(id: Room['id'], payload: Partial<Room>): Promise<Room> {
    const entity = await this.roomRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const room = this.roomRepository.create(
      RoomMapper.toPersistence({
        ...RoomMapper.toDomain(entity),
        ...payload,
      }),
    );

    if (!room.employeeProfile) {
      room.employeeProfile = null;
    }

    if (!room.specialty) {
      room.specialty = null;
    }

    const updatedEntity = await this.roomRepository.save(room);

    return RoomMapper.toDomain(updatedEntity);
  }

  async remove(id: Room['id']): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
