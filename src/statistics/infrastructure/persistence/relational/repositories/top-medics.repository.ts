import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { FindTopGeneralDto } from 'src/statistics/dto/find-top-general.dto';
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

  private renderTimeQuery(time?: FindTopGeneralDto): string {
    if (time?.from && time?.to) {
      const fromString = time.from.toISOString().split('T')[0];
      const toString = time.to.toISOString().split('T')[0];
      return `DATE(request.createdAt) BETWEEN DATE(${fromString}) AND DATE(
        ${toString}
        )`;
    } else if (time?.from) {
      const fromString = time.from.toISOString().split('T')[0];
      return `DATE(request.createdAt) BETWEEN DATE(${fromString}) AND CURRENT_DATE()`;
    } else if (time?.to) {
      const toString = time.to.toISOString().split('T')[0];
      return `DATE(request.createdAt) BETWEEN DATE(2000-01-01) AND DATE(
        ${toString}
        )`;
    } else {
      return '';
    }
  }
  async findAll(time?: FindTopGeneralDto): Promise<TopMedics[]> {
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

    if (time?.from || time?.to) {
      entities = await query.andWhere(this.renderTimeQuery(time)).getRawMany();
    } else {
      entities = await query.getRawMany();
    }

    return entities.map((entity) => TopMedicsMapper.toDomain(entity));
  }
}
