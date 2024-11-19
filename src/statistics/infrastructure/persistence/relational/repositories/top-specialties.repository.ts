import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { DataSource } from 'typeorm';
import { TopSpecialties } from '../../../../domain/top-specialties';
import { TopSpecialtiesRepository } from '../../top-specialties.repository';
import { TopSpecialtiesMapper } from '../mappers/top-specialties.mapper';
import { dateRangeQuery } from 'src/utils/statistics-utils';

@Injectable({ scope: Scope.REQUEST })
export class TopSpecialtiesRelationalRepository
  extends BaseRepository
  implements TopSpecialtiesRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  async findAll(date?: StatisticsDateDto): Promise<TopSpecialties[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .leftJoin('request.requestedSpecialty', 'specialty')
      .leftJoin('specialty.image', 'file', 'specialty.imageId = file.id')
      .where('request.status <> :status', { status: 'cancelled' })
      .groupBy('request.requestedSpecialtyId')
      .orderBy('count(request.id)', 'DESC')
      .select([
        'request.requestedSpecialtyId AS specialtyId',
        'specialty.name AS name',
        'file.path AS avatar',
        'count(request.id) AS requests',
      ])
      .limit(10);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.where(`DATE(request.createdAt) ${dateRange}`);
    }

    entities = await query.getRawMany();

    return entities.map((entity) => TopSpecialtiesMapper.toDomain(entity));
  }
}
