import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomEntity } from '../entities/room.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Room } from '../../../../domain/room';
import { RoomRepository } from '../../room.repository';
import { RoomMapper } from '../mappers/room.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/rooms/rooms.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class RoomRelationalRepository implements RoomRepository {
  constructor(
    @InjectRepository(RoomEntity)
    private readonly roomRepository: Repository<RoomEntity>,
  ) {}

  private relations = ['specialty', 'employeeProfile'];

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
    if (options?.minimal) relations = [];

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
    if (options?.minimal) relations = [];

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

    const updatedEntity = await this.roomRepository.save(
      this.roomRepository.create(
        RoomMapper.toPersistence({
          ...RoomMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RoomMapper.toDomain(updatedEntity);
  }

  async remove(id: Room['id']): Promise<void> {
    await this.roomRepository.delete(id);
  }
}
