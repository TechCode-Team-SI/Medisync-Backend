import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/installations/installations.messages';
import { DataSource, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Installation } from '../../../../domain/installation';
import { InstallationRepository } from '../../installation.repository';
import { InstallationEntity } from '../entities/installation.entity';
import { InstallationMapper } from '../mappers/installation.mapper';
@Injectable({ scope: Scope.REQUEST })
export class InstallationRelationalRepository
  extends BaseRepository
  implements InstallationRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get installationRepository(): Repository<InstallationEntity> {
    return this.getRepository(InstallationEntity);
  }

  async create(data: Installation): Promise<Installation> {
    const persistenceModel = InstallationMapper.toPersistence(data);
    const newEntity = await this.installationRepository.save(
      this.installationRepository.create(persistenceModel),
    );
    return InstallationMapper.toDomain(newEntity);
  }

  async findOne(): Promise<NullableType<Installation>> {
    const entity = await this.installationRepository.findOne({
      where: { id: 1 },
    });

    return entity ? InstallationMapper.toDomain(entity) : null;
  }

  async update(
    id: Installation['id'],
    payload: Partial<Installation>,
  ): Promise<Installation> {
    const entity = await this.installationRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.installationRepository.save(
      this.installationRepository.create(
        InstallationMapper.toPersistence({
          ...InstallationMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return InstallationMapper.toDomain(updatedEntity);
  }
}
