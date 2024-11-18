import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';
import { DataSource } from 'typeorm';
import { TopMedics } from '../../../../domain/top-medics';
import { TopMedicsRepository } from '../../top-medics.repository';
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

  async findAll(time?: StatisticsTimeEnum): Promise<TopMedics[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .innerJoin(
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

    if (time && time !== StatisticsTimeEnum.ALL_TIME) {
      entities = await query.andWhere(this.renderTimeQuery(time)).getRawMany();
    } else {
      entities = await query.getRawMany();
    }

    return entities.map((entity) => TopMedicsMapper.toDomain(entity));
  }
}
