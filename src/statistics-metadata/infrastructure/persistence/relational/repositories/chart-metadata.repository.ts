import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { DataSource } from 'typeorm';
import { ChartMetadataRepository } from '../../chart-metadata.repository';
import { dateRangeQuery } from 'src/utils/statistics-utils';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { RatingEntity } from 'src/ratings/infrastructure/persistence/relational/entities/rating.entity';
import { ChartTypeEnum } from 'src/statistics-metadata/statistics-metadata.enum';

@Injectable({ scope: Scope.REQUEST })
export class ChartMetadataRelationalRepository
  extends BaseRepository
  implements ChartMetadataRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  async gender(date?: StatisticsDateDto): Promise<Chart> {
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

    const result: Chart = {
      type: ChartTypeEnum.BAR,
      title: 'Genero',
      description: 'Porcentaje de pacientes según su genero',
      data: entities.map((entity) => ({
        category: entity.value || '',
        value: Number(entity.count) || 0,
      })),
    };

    return result;
  }

  async age(date?: StatisticsDateDto): Promise<Chart> {
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

    const result: Chart = {
      type: ChartTypeEnum.BAR,
      title: 'Edad',
      description: 'Edades de los pacientes',
      data: entities.map((entity) => ({
        category: entity.value || '',
        value: Number(entity.count),
      })),
    };

    return result;
  }

  async requestStatus(date?: StatisticsDateDto): Promise<Chart> {
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

    const result: Chart = {
      type: ChartTypeEnum.PIE,
      title: 'Estatus de solicitudes',
      description: 'Porcentajes de solicitudes según su estatus',
      data: entities.map((entity) => ({
        category: entity.value || '',
        value: Number(entity.count) || 0,
      })),
    };

    return result;
  }

  async rating(date?: StatisticsDateDto): Promise<Chart> {
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

    const result: Chart = {
      type: ChartTypeEnum.PIE,
      title: 'Calificaciones',
      description: 'Cantidad de solicitudes según su clasificación',
      data: entities.map((entity) => ({
        category: entity.value,
        value: Number(entity.count),
      })),
    };

    return result;
  }
}
