import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketTypeEntity } from '../entities/ticket-type.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { TicketType } from '../../../../domain/ticket-type';
import { TicketTypeRepository } from '../../ticket-type.repository';
import { TicketTypeMapper } from '../mappers/ticket-type.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/ticket-types/ticket-types.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class TicketTypeRelationalRepository implements TicketTypeRepository {
  constructor(
    @InjectRepository(TicketTypeEntity)
    private readonly TicketTypeRepository: Repository<TicketTypeEntity>,
  ) {}

  private relations = [];

  async create(data: TicketType): Promise<TicketType> {
    const persistenceModel = TicketTypeMapper.toPersistence(data);
    const newEntity = await this.TicketTypeRepository.save(
      this.TicketTypeRepository.create(persistenceModel),
    );
    return TicketTypeMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<TicketType>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.TicketTypeRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => TicketTypeMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'ticket-types',
      },
    );
  }

  async findById(
    id: TicketType['id'],
    options?: findOptions,
  ): Promise<NullableType<TicketType>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.TicketTypeRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? TicketTypeMapper.toDomain(entity) : null;
  }

  async update(
    id: TicketType['id'],
    payload: Partial<TicketType>,
  ): Promise<TicketType> {
    const entity = await this.TicketTypeRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.TicketTypeRepository.save(
      this.TicketTypeRepository.create(
        TicketTypeMapper.toPersistence({
          ...TicketTypeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return TicketTypeMapper.toDomain(updatedEntity);
  }

  async remove(id: TicketType['id']): Promise<void> {
    await this.TicketTypeRepository.delete(id);
  }
}
