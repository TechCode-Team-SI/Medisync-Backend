import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/packages/packages.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DataSource, In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Package } from '../../../../domain/package';
import { PackageRepository } from '../../package.repository';
import { PackageEntity } from '../entities/package.entity';
import { PackageMapper } from '../mappers/package.mapper';

@Injectable({ scope: Scope.REQUEST })
export class PackageRelationalRepository
  extends BaseRepository
  implements PackageRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get packageRepository(): Repository<PackageEntity> {
    return this.getRepository(PackageEntity);
  }

  private relations = [];

  async create(data: Package): Promise<Package> {
    const persistenceModel = PackageMapper.toPersistence(data);
    const newEntity = await this.packageRepository.save(
      this.packageRepository.create(persistenceModel),
    );
    return PackageMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Package>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.packageRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => PackageMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'packages',
      },
    );
  }

  async findById(
    id: Package['id'],
    options?: findOptions,
  ): Promise<NullableType<Package>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.packageRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? PackageMapper.toDomain(entity) : null;
  }

  async findAllBySlug(
    slugs: Package['slug'][],
    options?: findOptions,
  ): Promise<NullableType<Package[]>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entities = await this.packageRepository.find({
      where: { slug: In(slugs) },
      relations,
    });

    return entities.map((entity) => PackageMapper.toDomain(entity));
  }

  async update(id: Package['id'], payload: Partial<Package>): Promise<Package> {
    const entity = await this.packageRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.packageRepository.save(
      this.packageRepository.create(
        PackageMapper.toPersistence({
          ...PackageMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PackageMapper.toDomain(updatedEntity);
  }

  async remove(id: Package['id']): Promise<void> {
    await this.packageRepository.delete(id);
  }
}
