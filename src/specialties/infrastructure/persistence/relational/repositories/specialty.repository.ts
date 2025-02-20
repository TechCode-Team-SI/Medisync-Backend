import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import {
  FilterSpecialtyDto,
  SortSpecialtyDto,
} from 'src/specialties/dto/find-all-specialties.dto';
import { exceptionResponses } from 'src/specialties/specialties.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { formatOrder } from 'src/utils/utils';
import {
  Brackets,
  DataSource,
  FindOneOptions,
  FindOptionsRelations,
  FindOptionsWhere,
  In,
  Like,
  Repository,
} from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Specialty } from '../../../../domain/specialty';
import { SpecialtyRepository } from '../../specialty.repository';
import { SpecialtyEntity } from '../entities/specialty.entity';
import { SpecialtyMapper } from '../mappers/specialty.mapper';

@Injectable({ scope: Scope.REQUEST })
export class SpecialtyRelationalRepository
  extends BaseRepository
  implements SpecialtyRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get specialtyRepository(): Repository<SpecialtyEntity> {
    return this.getRepository(SpecialtyEntity);
  }

  private relations: FindOptionsRelations<SpecialtyEntity> = {
    image: true,
    requestTemplate: true,
    agenda: true,
  };

  async create(data: Specialty): Promise<Specialty> {
    const persistenceModel = SpecialtyMapper.toPersistence(data);
    const newEntity = await this.specialtyRepository.save(
      this.specialtyRepository.create(persistenceModel),
    );
    return SpecialtyMapper.toDomain(newEntity);
  }

  async createMultiple(data: Specialty[]): Promise<Specialty[]> {
    const persistenceModels = data.map((specialty) =>
      SpecialtyMapper.toPersistence(specialty),
    );
    const newEntities = await this.specialtyRepository.save(
      this.specialtyRepository.create(persistenceModels),
    );
    return newEntities.map((newEntity) => SpecialtyMapper.toDomain(newEntity));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
    filterOptions,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    filterOptions?: FilterSpecialtyDto | null;
    sortOptions: SortSpecialtyDto[] | null;
  }): Promise<PaginationResponseDto<Specialty>> {
    let order: FindOneOptions<SpecialtyEntity>['order'] = { createdAt: 'DESC' };
    if (sortOptions) order = formatOrder(sortOptions);

    let where: FindOptionsWhere<SpecialtyEntity> = {};
    if (filterOptions?.search)
      where = { ...where, name: Like(`%${filterOptions.search}%`) };
    if (filterOptions?.employeeProfileIds)
      where = {
        ...where,
        employees: { id: In([filterOptions.employeeProfileIds]) },
      };
    if (
      filterOptions?.isDisabled !== null &&
      filterOptions?.isDisabled !== undefined
    ) {
      where = { ...where, isDisabled: filterOptions.isDisabled };
    }
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const [entities, count] = await this.specialtyRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where,
      order,
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

  async isUserInSpecialty(id: string): Promise<boolean> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(SpecialtyEntity)
      .createQueryBuilder('s')
      .innerJoin('s.employees', 'e')
      .innerJoin('e.user', 'u')
      .where('u.id = :id', { id });

    const entity = await query.getOne();

    return !!entity;
  }

  async findAllActiveWithPagination({
    paginationOptions,
    isPublic,
  }: {
    paginationOptions: IPaginationOptions;
    isPublic?: boolean;
  }): Promise<PaginationResponseDto<Specialty>> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(SpecialtyEntity)
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.image', 'i')
      .innerJoin('s.employees', 'e')
      .where('s.isDisabled = false')
      .andWhere('s.requestTemplate IS NOT NULL')
      .andWhere('e.status = true')
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            new Brackets((qb) => {
              qb.where('s.isGroup = false').andWhere('e.agendaId IS NOT NULL');
            }),
          ).orWhere(
            new Brackets((qb) => {
              qb.where('s.isGroup = true').andWhere('s.agendaId IS NOT NULL');
            }),
          );
        }),
      )
      .orderBy('s.name', 'DESC');

    if (isPublic) {
      query.andWhere('s.isPublic = :isPublic', { isPublic });
    }

    const entities = await query.getMany();
    const count = await query.getCount();

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
    if (options?.minimal) relations = {};

    const entity = await this.specialtyRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? SpecialtyMapper.toDomain(entity) : null;
  }

  async findAllWithNames(
    names: Specialty['name'][],
    options?: findOptions,
  ): Promise<Specialty[]> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entities = await this.specialtyRepository.find({
      where: { name: In(names) },
      relations,
    });

    return entities.map((entity) => SpecialtyMapper.toDomain(entity));
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
