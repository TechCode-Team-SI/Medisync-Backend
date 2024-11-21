import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, FindOptionsRelations, Not, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SessionEntity } from '../entities/session.entity';

import { Session } from '../../../../domain/session';
import { SessionRepository } from '../../session.repository';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { BaseRepository } from 'src/common/base.repository';
import { exceptionResponses } from 'src/session/session.messages';
import { findOptions } from 'src/utils/types/fine-options.type';
import { User } from '../../../../../users/domain/user';
import { SessionMapper } from '../mappers/session.mapper';

@Injectable()
export class SessionRelationalRepository
  extends BaseRepository
  implements SessionRepository
{
  constructor(
    datasource: DataSource,
    @Inject(REQUEST)
    request: Request,
  ) {
    super(datasource, request);
  }

  private get sessionRepository(): Repository<SessionEntity> {
    return this.getRepository(SessionEntity);
  }

  private relations: FindOptionsRelations<SessionEntity> = {};

  async findById(
    id: Session['id'],
    options?: findOptions,
  ): Promise<NullableType<Session>> {
    let relations = this.relations;
    if (options?.minimal) relations = {};

    const entity = await this.sessionRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? SessionMapper.toDomain(entity) : null;
  }

  async create(data: Session): Promise<Session> {
    const persistenceModel = SessionMapper.toPersistence(data);
    const newEntity = await this.sessionRepository.save(
      this.sessionRepository.create(persistenceModel),
    );
    return SessionMapper.toDomain(newEntity);
  }

  async update(
    id: Session['id'],
    payload: Partial<
      Omit<Session, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>
    >,
  ): Promise<Session | null> {
    const entity = await this.sessionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.sessionRepository.save(
      this.sessionRepository.create(
        SessionMapper.toPersistence({
          ...SessionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SessionMapper.toDomain(updatedEntity);
  }

  async deleteById(id: Session['id']): Promise<void> {
    await this.sessionRepository.softDelete({ id });
  }

  async deleteByUserId(conditions: { userId: User['id'] }): Promise<void> {
    await this.sessionRepository.softDelete({
      user: {
        id: conditions.userId,
      },
    });
  }

  async deleteByUserIdWithExclude(conditions: {
    userId: User['id'];
    excludeSessionId: Session['id'];
  }): Promise<void> {
    await this.sessionRepository.softDelete({
      user: {
        id: conditions.userId,
      },
      id: Not(conditions.excludeSessionId),
    });
  }
}
