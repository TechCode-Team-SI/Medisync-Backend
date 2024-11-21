import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EmployeeProfile } from '../../../../domain/employee-profile';
import { EmployeeProfileRepository } from '../../employee-profile.repository';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';
import { EmployeeProfileMapper } from '../mappers/employee-profile.mapper';
import { exceptionResponses } from 'src/employee-profiles/employee-profiles.messages';

@Injectable({ scope: Scope.REQUEST })
export class EmployeeProfileRelationalRepository
  extends BaseRepository
  implements EmployeeProfileRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get employeeProfileRepository(): Repository<EmployeeProfileEntity> {
    return this.getRepository(EmployeeProfileEntity);
  }

  private relations: FindOptionsRelations<EmployeeProfileEntity> = {
    agenda: true,
    room: true,
  };

  async findById(
    id: EmployeeProfile['id'],
    options?: findOptions,
  ): Promise<NullableType<EmployeeProfile>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.employeeProfileRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? EmployeeProfileMapper.toDomain(entity) : null;
  }

  async update(
    id: EmployeeProfile['id'],
    payload: Partial<EmployeeProfile>,
  ): Promise<EmployeeProfile> {
    const entity = await this.employeeProfileRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.employeeProfileRepository.save(
      this.employeeProfileRepository.create(
        EmployeeProfileMapper.toPersistence({
          ...EmployeeProfileMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return EmployeeProfileMapper.toDomain(updatedEntity);
  }
}
