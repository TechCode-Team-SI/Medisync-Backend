import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionResponses } from 'src/roles/roles.messages';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Role } from '../../../../domain/role';
import { RoleRepository } from '../../role.repository';
import { RoleEntity } from '../entities/role.entity';
import { RoleMapper } from '../mappers/role.mapper';

@Injectable()
export class RoleRelationalRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async create(data: Role): Promise<Role> {
    const persistenceModel = RoleMapper.toPersistence(data);

    try {
      const newEntity = await this.roleRepository.save(
        this.roleRepository.create(persistenceModel),
      );
      return RoleMapper.toDomain(newEntity);
    } catch (error) {
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    }
  }

  async findManyByIds(ids: string[]): Promise<Role[]> {
    const entities = await this.roleRepository.find({
      where: { id: In(ids) },
      loadEagerRelations: true,
    });
    return entities.map((role) => RoleMapper.toDomain(role));
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Role[]> {
    const entities = await this.roleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      loadEagerRelations: true,
    });

    return entities.map((user) => RoleMapper.toDomain(user));
  }

  async findById(id: Role['id']): Promise<NullableType<Role>> {
    const entity = await this.roleRepository.findOne({
      where: { id },
      loadEagerRelations: true,
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async findByName(name: Role['name']): Promise<NullableType<Role>> {
    const entity = await this.roleRepository.findOne({
      where: { name },
      loadEagerRelations: true,
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async update(id: Role['id'], payload: Partial<Role>): Promise<Role> {
    const entity = await this.roleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.roleRepository.save(
      this.roleRepository.create(
        RoleMapper.toPersistence({
          ...RoleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return RoleMapper.toDomain(updatedEntity);
  }

  async remove(id: Role['id']): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
