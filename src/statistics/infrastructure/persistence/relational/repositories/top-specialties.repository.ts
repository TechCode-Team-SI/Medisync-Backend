import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';
import { DataSource, Repository } from 'typeorm';
import { TopSpecialties } from '../../../../domain/top-specialties';
import { TopSpecialtiesRepository } from '../../top-specialties.repository';
import {
  TopSpecialtiesAllTimeEntity,
  TopSpecialtiesCurrentDayEntity,
  TopSpecialtiesCurrentMonthEntity,
  TopSpecialtiesCurrentYearEntity,
  TopSpecialtiesEntity,
} from '../entities/top-specialties.entity';
import { TopSpecialtiesMapper } from '../mappers/top-specialties.mapper';

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

  private getTopSpecialtiesRepository(
    time?: StatisticsTimeEnum,
  ): Repository<TopSpecialtiesEntity> {
    switch (time) {
      default:
      case StatisticsTimeEnum.ALL_TIME:
        return this.getRepository(TopSpecialtiesAllTimeEntity);
      case StatisticsTimeEnum.THIS_YEAR:
        return this.getRepository(TopSpecialtiesCurrentYearEntity);
      case StatisticsTimeEnum.THIS_MONTH:
        return this.getRepository(TopSpecialtiesCurrentMonthEntity);
      case StatisticsTimeEnum.TODAY:
        return this.getRepository(TopSpecialtiesCurrentDayEntity);
    }
  }

  async findAll(time?: StatisticsTimeEnum): Promise<TopSpecialties[]> {
    const entities = await this.getTopSpecialtiesRepository(time).find();

    return entities.map((entity) => TopSpecialtiesMapper.toDomain(entity));
  }
}
