import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtyEntity } from '../entities/specialty.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Specialty } from '../../../../domain/specialty';
import { SpecialtyRepository } from '../../specialty.repository';
import { SpecialtyMapper } from '../mappers/specialty.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/specialties/specialties.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class SpecialtyRelationalRepository implements SpecialtyRepository {
  constructor(
    @InjectRepository(SpecialtyEntity)
    private readonly specialtyRepository: Repository<SpecialtyEntity>,
  ) {}

  private relations = ['image'];

  async create(data: Specialty): Promise<Specialty> {
    const persistenceModel = SpecialtyMapper.toPersistence(data);
    const newEntity = await this.specialtyRepository.save(
      this.specialtyRepository.create(persistenceModel),
    );
    return SpecialtyMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Specialty>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.specialtyRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => SpecialtyMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'specialties',
      },
    );
  }

  async findById(
    id: Specialty['id'],
    options?: findOptions,
  ): Promise<NullableType<Specialty>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.specialtyRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? SpecialtyMapper.toDomain(entity) : null;
  }

  async update(
    id: Specialty['id'],
    payload: Partial<Specialty>,
  ): Promise<Specialty> {
    const entity = await this.specialtyRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.specialtyRepository.save(
      this.specialtyRepository.create(
        SpecialtyMapper.toPersistence({
          ...SpecialtyMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SpecialtyMapper.toDomain(updatedEntity);
  }

  async remove(id: Specialty['id']): Promise<void> {
    await this.specialtyRepository.delete(id);
  }
}
