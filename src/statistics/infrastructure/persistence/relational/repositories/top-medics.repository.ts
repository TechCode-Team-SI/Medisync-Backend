import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';
import { DataSource, Repository } from 'typeorm';
import { TopMedics } from '../../../../domain/top-medics';
import { TopMedicsRepository } from '../../top-medics.repository';
import {
  TopMedicsAllTimeEntity,
  TopMedicsCurrentDayEntity,
  TopMedicsCurrentMonthEntity,
  TopMedicsCurrentYearEntity,
  TopMedicsEntity,
} from '../entities/top-medics.entity';
import { TopMedicsMapper } from '../mappers/top-medics.mapper';

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

  private getTopMedicsRepository(
    time?: StatisticsTimeEnum,
  ): Repository<TopMedicsEntity> {
    switch (time) {
      default:
      case StatisticsTimeEnum.ALL_TIME:
        return this.getRepository(TopMedicsAllTimeEntity);
      case StatisticsTimeEnum.THIS_YEAR:
        return this.getRepository(TopMedicsCurrentYearEntity);
      case StatisticsTimeEnum.THIS_MONTH:
        return this.getRepository(TopMedicsCurrentMonthEntity);
      case StatisticsTimeEnum.TODAY:
        return this.getRepository(TopMedicsCurrentDayEntity);
    }
  }

  async findAll(time?: StatisticsTimeEnum): Promise<TopMedics[]> {
    const entities = await this.getTopMedicsRepository(time).find();

    return entities.map((entity) => TopMedicsMapper.toDomain(entity));
  }
}
