import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsFilterDto } from 'src/statistics/dto/statistics-filter.dto';
import { DataSource } from 'typeorm';
import { ChartMetadataRepository } from '../../chart-metadata.repository';
import { dateRangeQuery } from 'src/utils/statistics-utils';
import { Chart } from 'src/statistics-metadata/statistics-metadata.type';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { RatingEntity } from 'src/ratings/infrastructure/persistence/relational/entities/rating.entity';
import { ChartTypeEnum } from 'src/statistics-metadata/statistics-metadata.enum';
import { RequestStatusEnum } from 'src/requests/requests.enum';

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

  async gender(date?: StatisticsFilterDto, userId?: string): Promise<Chart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .where('request.status <> :status', { status: 'cancelled' })
      .groupBy('request.patientGender')
      .select(['count(request.id) AS count', 'request.patientGender AS value'])
      .orderBy('count', 'DESC');

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    if (date?.filterByMe !== undefined && userId !== undefined) {
      query.andWhere('request.requestedMedic = :medicId', { medicId: userId });
    }

    const entities = await query.getRawMany();

    const genderMapping: Record<string, string> = {
      M: 'Masculino',
      F: 'Femenino',
    };

    const result: Chart = {
      type: ChartTypeEnum.PIE,
      title: 'Sexo',
      description: 'Pacientes según su sexo',
      data: entities.map((entity) => ({
        category: genderMapping[entity.value] || '',
        value: Number(entity.count) || 0,
      })),
    };

    return result;
  }

  async age(date?: StatisticsFilterDto, userId?: string): Promise<Chart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .where('request.status <> :status', { status: 'cancelled' })
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

    if (date?.filterByMe !== undefined && userId !== undefined) {
      query.andWhere('request.requestedMedic = :medicId', { medicId: userId });
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

  async requestStatus(
    date?: StatisticsFilterDto,
    userId?: string,
  ): Promise<Chart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .groupBy('value')
      .select(['count(request.id) AS count', 'request.status AS value'])
      .orderBy('count', 'DESC');

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    if (date?.filterByMe !== undefined && userId !== undefined) {
      query.andWhere('request.requestedMedic = :medicId', { medicId: userId });
    }

    const entities = await query.getRawMany();

    const statusMapping: Record<string, string> = {
      [RequestStatusEnum.PENDING]: 'Pendiente',
      [RequestStatusEnum.ATTENDING]: 'Atendiendo',
      [RequestStatusEnum.CANCELLED]: 'Cancelada',
      [RequestStatusEnum.COMPLETED]: 'Completada',
    };

    const result: Chart = {
      type: ChartTypeEnum.PIE,
      title: 'Citas',
      description: 'Estatus de las citas',
      data: entities.map((entity) => ({
        category: statusMapping[entity.value] || '',
        value: Number(entity.count) || 0,
      })),
    };

    return result;
  }

  async rating(date?: StatisticsFilterDto, userId?: string): Promise<Chart> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RatingEntity)
      .createQueryBuilder('rating')
      .leftJoin('rating.request', 'request', 'rating.requestId = request.id')
      .groupBy('value')
      .select(['count(request.id) AS count', 'rating.stars AS value'])
      .orderBy('value');

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    if (date?.filterByMe !== undefined && userId !== undefined) {
      query.andWhere('request.requestedMedic = :medicId', { medicId: userId });
    }

    const entities = await query.getRawMany();

    const convertToStars = (value: number): string => {
      return '⭐'.repeat(value);
    };

    const result: Chart = {
      type: ChartTypeEnum.BAR,
      title: 'Calificaciones',
      description: 'Calificaciones de las citas',
      data: entities.map((entity) => ({
        category: convertToStars(Number(entity.value)),
        value: Number(entity.count),
      })),
    };

    return result;
  }
}
