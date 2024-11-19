import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { DataSource } from 'typeorm';
import { TopWeekdays } from '../../../../domain/top-weekdays';
import { TopWeekdaysRepository } from '../../top-weekdays.repository';
import { TopWeekdaysMapper } from '../mappers/top-weekdays.mapper';
import { dateRangeQuery } from 'src/utils/statistics-utils';

@Injectable({ scope: Scope.REQUEST })
export class TopWeekdaysRelationalRepository
  extends BaseRepository
  implements TopWeekdaysRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  async findAll(date?: StatisticsDateDto): Promise<TopWeekdays[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .where('request.status <> :status', { status: 'cancelled' })
      .groupBy('weekday(request.createdAt)')
      .orderBy('count(request.id)', 'DESC')
      .select([
        'weekday(request.createdAt) AS weekday',
        'count(request.id) AS requests',
      ])
      .limit(10);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.where(`DATE(request.createdAt) ${dateRange}`);
    }

    entities = await query.getRawMany();

    return entities.map((entity) => TopWeekdaysMapper.toDomain(entity));
  }
}
