import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { DataSource } from 'typeorm';
import { TopMedics } from '../../../../domain/top-medics';
import { TopMedicsRepository } from '../../top-medics.repository';
import { TopMedicsMapper } from '../mappers/top-medics.mapper';
import { dateRangeQuery } from 'src/utils/statistics-utils';

@Injectable({ scope: Scope.REQUEST })
export class TopMedicsRelationalRepository
  extends BaseRepository
  implements TopMedicsRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  async findAll(date?: StatisticsDateDto): Promise<TopMedics[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .leftJoin(
        'request.requestedMedic',
        'user',
        'request.requestedMedicId = user.id',
      )
      .leftJoin('user.photo', 'file', 'user.photoId = file.id')
      .where('request.status <> :status', { status: 'cancelled' })
      .groupBy('request.requestedMedicId')
      .orderBy('count(request.id)', 'DESC')
      .select([
        'request.requestedMedicId AS medicId',
        'user.fullName AS fullName',
        'file.path AS avatar',
        'count(request.id) AS requests',
      ])
      .limit(10);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.where(`DATE(request.createdAt) ${dateRange}`);
    }

    entities = await query.getRawMany();

    return entities.map((entity) => TopMedicsMapper.toDomain(entity));
  }
}
