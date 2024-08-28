import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/medical-centers/medical-centers.messages';
import { findOptions } from 'src/utils/types/fine-options.type';
import { DataSource, FindOptionsRelations, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { MedicalCenter } from '../../../../domain/medical-center';
import { MedicalCenterRepository } from '../../medical-center.repository';
import { MedicalCenterEntity } from '../entities/medical-center.entity';
import { MedicalCenterMapper } from '../mappers/medical-center.mapper';

@Injectable({ scope: Scope.REQUEST })
export class MedicalCenterRelationalRepository
  extends BaseRepository
  implements MedicalCenterRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get medicalCenterRepository(): Repository<MedicalCenterEntity> {
    return this.getRepository(MedicalCenterEntity);
  }

  private relations: FindOptionsRelations<MedicalCenterEntity> = {};

  async create(data: MedicalCenter): Promise<MedicalCenter> {
    const persistenceModel = MedicalCenterMapper.toPersistence(data);
    const newEntity = await this.medicalCenterRepository.save(
      this.medicalCenterRepository.create(persistenceModel),
    );
    return MedicalCenterMapper.toDomain(newEntity);
  }

  async findById(options?: findOptions): Promise<NullableType<MedicalCenter>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.medicalCenterRepository.findOne({
      where: { id: 1 },
      relations,
    });

    return entity ? MedicalCenterMapper.toDomain(entity) : null;
  }

  async update(payload: Partial<MedicalCenter>): Promise<MedicalCenter> {
    const entity = await this.medicalCenterRepository.findOne({
      where: { id: 1 },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.medicalCenterRepository.save(
      this.medicalCenterRepository.create(
        MedicalCenterMapper.toPersistence({
          ...MedicalCenterMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return MedicalCenterMapper.toDomain(updatedEntity);
  }

  async remove(): Promise<void> {
    await this.medicalCenterRepository.delete(1);
  }
}
