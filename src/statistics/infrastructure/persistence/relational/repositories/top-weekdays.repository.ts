import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { FindTopGeneralDto } from 'src/statistics/dto/find-top-general.dto';
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

  private renderTimeQuery(time?: FindTopGeneralDto): string {
    if (time?.from && time?.to) {
      return `DATE(request.createdAt) BETWEEN DATE(${time.from}) AND DATE(
        ${time.to}
        )`;
    } else if (time?.from) {
      return `DATE(request.createdAt) BETWEEN DATE(${time.from}) AND CURRENT_DATE()`;
    } else if (time?.to) {
      return `DATE(request.createdAt) BETWEEN DATE(2000-01-01) AND DATE(
        ${time.to}
        )`;
    } else {
      return '';
    }
  }

  async findAll(time?: FindTopGeneralDto): Promise<TopWeekdays[]> {
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

    if (time?.from || time?.to) {
      entities = await query.andWhere(this.renderTimeQuery(time)).getRawMany();
    } else {
      entities = await query.getRawMany();
    }
    return entities.map((entity) => TopWeekdaysMapper.toDomain(entity));
  }
}
