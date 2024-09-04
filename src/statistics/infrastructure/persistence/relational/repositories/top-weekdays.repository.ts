import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';
import { DataSource, Repository } from 'typeorm';
import { TopWeekdays } from '../../../../domain/top-weekdays';
import { TopWeekdaysRepository } from '../../top-weekdays.repository';
import {
  TopWeekdaysAllTimeEntity,
  TopWeekdaysCurrentDayEntity,
  TopWeekdaysCurrentMonthEntity,
  TopWeekdaysCurrentYearEntity,
  TopWeekdaysEntity,
} from '../entities/top-weekdays.entity';
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

  private getTopWeekdaysRepository(
    time?: StatisticsTimeEnum,
  ): Repository<TopWeekdaysEntity> {
    switch (time) {
      default:
      case StatisticsTimeEnum.ALL_TIME:
        return this.getRepository(TopWeekdaysAllTimeEntity);
      case StatisticsTimeEnum.THIS_YEAR:
        return this.getRepository(TopWeekdaysCurrentYearEntity);
      case StatisticsTimeEnum.THIS_MONTH:
        return this.getRepository(TopWeekdaysCurrentMonthEntity);
      case StatisticsTimeEnum.TODAY:
        return this.getRepository(TopWeekdaysCurrentDayEntity);
    }
  }

  async findAll(time?: StatisticsTimeEnum): Promise<TopWeekdays[]> {
    const entities = await this.getTopWeekdaysRepository(time).find();

    return entities.map((entity) => TopWeekdaysMapper.toDomain(entity));
  }
}
