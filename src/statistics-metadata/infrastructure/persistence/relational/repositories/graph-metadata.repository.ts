import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { DataSource } from 'typeorm';
import { GraphMetadataRepository } from '../../graph-metadata.repository';
import { dateRangeQuery } from 'src/utils/statistics-utils';
import {
  Histogram,
  Tart,
} from 'src/statistics-metadata/statistics-metadata.type';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { RatingEntity } from 'src/ratings/infrastructure/persistence/relational/entities/rating.entity';

@Injectable({ scope: Scope.REQUEST })
export class GraphMetadataRelationalRepository
  extends BaseRepository
  implements GraphMetadataRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  async gender(date?: StatisticsDateDto): Promise<Tart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .groupBy('request.patientGender')
      .select(['count(request.id) AS count', 'request.patientGender AS value']);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const entities = await query.getRawMany();

    const totalCount = entities.reduce((acc, entity) => acc + +entity.count, 0);

    const result: Tart = {
      label: 'Genero',
      description: 'Porcentaje de pacientes según su genero',
      data: entities.map((entity) => ({
        label: entity.value || '',
        probabilities:
          Number(((entity.count / totalCount) * 100).toFixed(2)) || 0,
      })),
    };

    return result;
  }

  async age(date?: StatisticsDateDto): Promise<Histogram> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .groupBy('value')
      .select([
        'count(request.id) AS count',
        'TIMESTAMPDIFF( YEAR, request.patientBirthday, CURDATE()) AS value',
      ])
      .orderBy('value');

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const entities = await query.getRawMany();

    const result: Histogram = {
      label: 'Edad',
      description: 'Edades de los pacientes',
      data: entities.map((entity) => ({
        label: entity.value,
        frequency: Number(entity.count),
      })),
    };

    return result;
  }

  async requestStatus(date?: StatisticsDateDto): Promise<Tart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .groupBy('value')
      .select(['count(request.id) AS count', 'request.status AS value']);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const entities = await query.getRawMany();

    const totalCount = entities.reduce((acc, entity) => acc + +entity.count, 0);

    const result: Tart = {
      label: 'Estatus de solicitudes',
      description: 'Porcentajes de solicitudes según su estatus',
      data: entities.map((entity) => ({
        label: entity.value,
        probabilities:
          Number(((entity.count / totalCount) * 100).toFixed(2)) || 0,
      })),
    };

    return result;
  }

  async rating(date?: StatisticsDateDto): Promise<Histogram> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RatingEntity)
      .createQueryBuilder('rating')
      .leftJoin('rating.request', 'request', 'rating.requestId = request.id')
      .groupBy('value')
      .select(['count(request.id) AS count', 'rating.stars AS value']);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const entities = await query.getRawMany();

    const result: Histogram = {
      label: 'Calificaciones',
      description: 'Cantidad de solicitudes según su clasificación',
      data: entities.map((entity) => ({
        label: entity.value,
        frequency: Number(entity.count),
      })),
    };

    return result;
  }
}
