import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { StatisticsTimeEnum } from 'src/statistics/statistics-time.enum';
import { DataSource } from 'typeorm';
import { TopSpecialties } from '../../../../domain/top-specialties';
import { TopSpecialtiesRepository } from '../../top-specialties.repository';
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

  async findAll(time?: StatisticsTimeEnum): Promise<TopSpecialties[]> {
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

    if (time && time !== StatisticsTimeEnum.ALL_TIME) {
      entities = await query.andWhere(this.renderTimeQuery(time)).getRawMany();
    } else {
      entities = await query.getRawMany();
    }

    return entities.map((entity) => TopSpecialtiesMapper.toDomain(entity));
  }
}
