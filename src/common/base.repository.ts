import { Request } from 'express';
import { DataSource, EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { ENTITY_MANAGER_KEY } from './transaction.interceptor';
export class BaseRepository {
  constructor(
    private readonly datasource: DataSource,
    private readonly request: Request,
  ) {}

  protected getRepository<T extends ObjectLiteral>(
    entityCls: new () => T,
  ): Repository<T> {
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY] || this.datasource;
    return entityManager.getRepository(entityCls);
  }

  protected getEntityManager(): EntityManager {
    return this.request[ENTITY_MANAGER_KEY] || this.datasource;
  }
}
