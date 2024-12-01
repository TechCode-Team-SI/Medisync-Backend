import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsFilterDto } from 'src/statistics/dto/statistics-filter.dto';
import { DataSource } from 'typeorm';
import { TopGeneric } from 'src/statistics/domain/top-generic';
import { TopGenericRepository } from '../../top-generic.repository';
import { TopGenericMapper } from '../mappers/top-generic.mapper';
import {
  dateGroupingQuery,
  dateRangeQuery,
  topDiagnosticQuery,
} from 'src/utils/statistics-utils';
import { StatisticsDiagnosticTopEnum } from 'src/statistics/statistics-top.enum';
import { DiagnosticEntity } from 'src/diagnostics/infrastructure/persistence/relational/entities/diagnostic.entity';
import { RequestEntity } from 'src/requests/infrastructure/persistence/relational/entities/request.entity';
import { StatisticsTimeUnitEnum } from 'src/statistics/statistics-time-unit.enum';

@Injectable({ scope: Scope.REQUEST })
export class TopGenericRelationalRepository
  extends BaseRepository
  implements TopGenericRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  async findTopMedics(date?: StatisticsFilterDto): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .innerJoin(
        'request.requestedMedic',
        'user',
        'request.requestedMedicId = user.id',
      )
      .where('request.status <> :status', { status: 'cancelled' });

    if (date?.specialtyId) {
      query
        .innerJoin(
          'request.requestedSpecialty',
          'specialty',
          'request.requestedSpecialty = specialty.id',
        )
        .andWhere(`request.requestedSpecialty = :specialtyId`, {
          specialtyId: date.specialtyId,
        });
    }

    query
      .groupBy('request.requestedMedicId')
      .orderBy('count(request.id)', 'DESC')
      .select(['user.fullName AS name', 'count(request.id) AS requests'])
      .limit(10);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const entities = await query.printSql().getRawMany();

    return entities.map((entity) => TopGenericMapper.toDomain(entity));
  }

  async findTopSpecialties(date?: StatisticsFilterDto): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .leftJoin('request.requestedSpecialty', 'specialty')
      .where('request.status <> :status', { status: 'cancelled' })
      .groupBy('request.requestedSpecialtyId')
      .orderBy('count(request.id)', 'DESC')
      .select(['specialty.name AS name', 'count(request.id) AS requests'])
      .limit(10);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    entities = await query.getRawMany();

    return entities.map((entity) => TopGenericMapper.toDomain(entity));
  }

  async findTopWeekdays(date?: StatisticsFilterDto): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .where('request.status <> :status', { status: 'cancelled' });

    if (date?.specialtyId) {
      query
        .innerJoin(
          'request.requestedSpecialty',
          'specialty',
          'request.requestedSpecialty = specialty.id',
        )
        .andWhere(`request.requestedSpecialty = :specialtyId`, {
          specialtyId: date.specialtyId,
        });
    }

    query
      .groupBy('dayname(request.createdAt)')
      .orderBy('count(request.id)', 'DESC')
      .select([
        'dayname(request.createdAt) AS name',
        'count(request.id) AS requests',
      ])
      .limit(10);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const dayMapping: Record<string, string> = {
      Sunday: 'Domingo',
      Monday: 'Lunes',
      Tuesday: 'Martes',
      Wednesday: 'Miércoles',
      Thursday: 'Jueves',
      Friday: 'Viernes',
      Saturday: 'Sábado',
    };

    entities = await query.getRawMany();

    return entities.map((entity) => {
      const dayInSpanish = dayMapping[entity.name];
      return TopGenericMapper.toDomain({ ...entity, name: dayInSpanish });
    });
  }

  async findTopDiagnostic(
    date?: StatisticsFilterDto,
    filter?: StatisticsDiagnosticTopEnum,
  ): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(DiagnosticEntity)
      .createQueryBuilder('diagnostic');

    const [entityName, columnName] = topDiagnosticQuery(filter);
    query.leftJoin(
      `diagnostic.${columnName}`,
      `${entityName}`,
      `${entityName}Id = ${entityName}.id`,
    );

    if (date?.specialtyId) {
      query
        .innerJoin(
          'diagnostic.specialty',
          'specialty',
          'diagnostic.specialty = specialty.id',
        )
        .andWhere(`diagnostic.specialty = :specialtyId`, {
          specialtyId: date.specialtyId,
        });
    }

    query
      .groupBy(`${entityName}.id`)
      .orderBy(`count(${entityName}.id)`, 'DESC')
      .select([
        `${entityName}.name AS name`,
        `count(${entityName}.id) AS requests`,
      ])
      .limit(10);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(diagnostic.createdAt) ${dateRange})`);
    }

    entities = await query.getRawMany();

    return entities
      .filter((entity) => entity.name !== null)
      .map((entity) => TopGenericMapper.toDomain(entity));
  }

  async findTopAges(date?: StatisticsFilterDto): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .where('request.status <> :status', { status: 'cancelled' });

    if (date?.specialtyId) {
      query
        .innerJoin(
          'request.requestedSpecialty',
          'specialty',
          'request.requestedSpecialty = specialty.id',
        )
        .andWhere(`request.requestedSpecialty = :specialtyId`, {
          specialtyId: date.specialtyId,
        });
    }

    query
      .groupBy('TIMESTAMPDIFF(YEAR, request.patientBirthday, CURDATE())')
      .select([
        'count(request.id) AS requests',
        'TIMESTAMPDIFF(YEAR, request.patientBirthday, CURDATE()) AS name',
      ]);

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const entities = await query.getRawMany();

    return entities.map((entity) => TopGenericMapper.toDomain(entity));
  }

  async findTopGenders(date?: StatisticsFilterDto): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .where('request.status <> :status', { status: 'cancelled' })
      .groupBy('request.patientGender')
      .select([
        'count(request.id) AS requests',
        'request.patientGender AS name',
      ]);

    if (date?.specialtyId) {
      query
        .innerJoin(
          'request.requestedSpecialty',
          'specialty',
          'request.requestedSpecialty = specialty.id',
        )
        .andWhere(`request.requestedSpecialty = :specialtyId`, {
          specialtyId: date.specialtyId,
        });
    }

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`(DATE(request.createdAt) ${dateRange})`);
    }

    const entities = await query.getRawMany();

    const genderMapping: Record<string, string> = {
      M: 'Masculino',
      F: 'Femenino',
    };

    return entities.map((entity) => {
      const gender = genderMapping[entity.name];
      return TopGenericMapper.toDomain({ ...entity, name: gender });
    });
  }

  async findTopDetailed(date?: StatisticsFilterDto): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    const query = entityManager
      .getRepository(RequestEntity)
      .createQueryBuilder('r')
      .where('r.status <> :status', { status: 'cancelled' });

    if (date?.specialtyId !== undefined) {
      query
        .innerJoin(
          'r.requestedSpecialty',
          'specialty',
          'r.requestedSpecialty = specialty.id',
        )
        .andWhere(`r.requestedSpecialty = :specialtyId`, {
          specialtyId: date.specialtyId,
        });
    }

    if (date?.gender !== undefined) {
      query.andWhere('r.patientGender = :gender', {
        gender: date.gender,
      });
    }

    if (date?.ageFrom !== undefined || date?.ageTo !== undefined) {
      query.andWhere(
        'TIMESTAMPDIFF(YEAR, r.patientBirthday, CURDATE()) BETWEEN :ageFrom AND :ageTo',
        { ageFrom: date.ageFrom ?? 0, ageTo: date.ageTo ?? 99 },
      );
    }

    if (date?.grouping !== undefined) {
      const dateGrouping = dateGroupingQuery(date.grouping);
      query
        .select([
          `${dateGrouping}(r.createdAt) as name`,
          'count(r.id) AS requests',
        ])
        .groupBy(`${dateGrouping}(r.createdAt)`)
        .orderBy(`${dateGrouping}(r.createdAt)`);
    } else {
      query
        .select(['YEAR(r.createdAt) as name', 'count(r.id) AS requests'])
        .groupBy('YEAR(r.createdAt)')
        .orderBy('YEAR(r.createdAt)');
    }

    if (date) {
      const dateRange = dateRangeQuery(date);
      query.andWhere(`DATE(r.createdAt) ${dateRange}`);
    }

    const entities = await query.getRawMany();

    if (!entities || entities.length === 0) {
      return [];
    }

    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    return entities.map((entity) => {
      if (date?.grouping === StatisticsTimeUnitEnum.MONTH) {
        const monthNumber = Number(entity.name);
        entity.name = monthNames[monthNumber - 1];
      }
      return TopGenericMapper.toDomain(entity);
    });
  }
}
