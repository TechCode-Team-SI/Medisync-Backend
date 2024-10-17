import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';
import { DataSource } from 'typeorm';
import { TopWeekdays } from '../../../../domain/top-weekdays';
import { TopWeekdaysRepository } from '../../top-weekdays.repository';
import { TopWeekdaysMapper } from '../mappers/top-weekdays.mapper';

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

  private renderTimeQuery(time?: StatisticsTimeEnum): string {
    switch (time) {
      case StatisticsTimeEnum.THIS_YEAR:
        return '(year(request.createdAt) = year(now()))';
      case StatisticsTimeEnum.THIS_MONTH:
        return '(year(request.createdAt) = year(now())) && (month(request.createdAt) = month(now()))';
      case StatisticsTimeEnum.TODAY:
        return 'Date(request.createdAt)=Curdate()';
      default:
        return '';
    }
  }

  async findAll(time?: StatisticsTimeEnum): Promise<TopWeekdays[]> {
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
      ]);

    if (time && time !== StatisticsTimeEnum.ALL_TIME) {
      entities = await query.andWhere(this.renderTimeQuery(time)).getRawMany();
    } else {
      entities = await query.getRawMany();
    }

    return entities.map((entity) => TopWeekdaysMapper.toDomain(entity));
  }
}
