import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { StatisticsDateDto } from 'src/statistics/dto/statistics-date.dto';
import { DataSource } from 'typeorm';
import { TopGeneric } from 'src/statistics/domain/top-generic';
import { TopGenericRepository } from '../../top-generic.repository';
import { TopGenericMapper } from '../mappers/top-generic.mapper';
import { dateRangeQuery, topQuery } from 'src/utils/statistics-utils';
import { StatisticsTopEnum } from 'src/statistics/statistics-top.enum';
import { DiagnosticEntity } from 'src/diagnostics/infrastructure/persistence/relational/entities/diagnostic.entity';

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

  async findAll(
    date?: StatisticsDateDto,
    filter?: StatisticsTopEnum,
  ): Promise<TopGeneric[]> {
    const entityManager = this.getEntityManager();
    let entities: any[] = [];
    const query = entityManager
      .getRepository(DiagnosticEntity)
      .createQueryBuilder('diagnostic');

    const [entityName, columnName] = topQuery(filter);
    query
      .leftJoin(
        `diagnostic.${columnName}`,
        `${entityName}`,
        `${entityName}Id = ${entityName}.id`,
      )
      .groupBy(`${entityName}.id`)
      .orderBy(`count(${entityName}.id)`, 'DESC')
      .select([
        `${entityName}.name AS name`,
        `${entityName}.description AS description`,
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
}
