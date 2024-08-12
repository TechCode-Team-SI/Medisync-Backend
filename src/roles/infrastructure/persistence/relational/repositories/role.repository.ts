import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { exceptionResponses } from 'src/roles/roles.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Role } from '../../../../domain/role';
import { RoleRepository } from '../../role.repository';
import { RoleEntity } from '../entities/role.entity';
import { RoleMapper } from '../mappers/role.mapper';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class RoleRelationalRepository implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  private relations = ['users', 'permissions'];

  async create(data: Role): Promise<Role> {
    const persistenceModel = RoleMapper.toPersistence(data);

    try {
      const newEntity = await this.roleRepository.save(
        this.roleRepository.create(persistenceModel),
      );
      return RoleMapper.toDomain(newEntity);
    } catch (error) {
      if (error.errno === 1452) {
        throw new UnprocessableEntityException(
          exceptionResponses.PermissionNotExist,
        );
      }
      throw new UnprocessableEntityException(exceptionResponses.AlreadyExists);
    }
  }

  async findManyByIds(ids: string[], options?: findOptions): Promise<Role[]> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entities = await this.roleRepository.find({
      where: { id: In(ids) },
      relations,
    });
    return entities.map((role) => RoleMapper.toDomain(role));
  }

  async findManyBySlugs(
    slugs: string[],
    options?: findOptions,
  ): Promise<Role[]> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entities = await this.roleRepository.find({
      where: { id: In(slugs) },
      relations,
    });
    return entities.map((role) => RoleMapper.toDomain(role));
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Role>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.roleRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => RoleMapper.toDomain(entity));

    return Pagination(
      { items, count },
      { ...paginationOptions, domain: 'roles' },
    );
  }

  async findById(
    id: Role['id'],
    options?: findOptions,
  ): Promise<NullableType<Role>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.roleRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async findBySlug(
    slug: Role['slug'],
    options?: findOptions,
  ): Promise<NullableType<Role>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.roleRepository.findOne({
      where: { slug },
      relations,
    });

    return entity ? RoleMapper.toDomain(entity) : null;
  }

  async update(id: Role['id'], payload: Partial<Role>): Promise<Role> {
    const entity = await this.findById(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (!entity.isMutable) {
      throw new UnprocessableEntityException(exceptionResponses.Inmutable);
    }

    const updatedEntity = await this.roleRepository.save(
      this.roleRepository.create(
        RoleMapper.toPersistence({
          ...entity,
          ...payload,
        }),
      ),
    );

    return RoleMapper.toDomain(updatedEntity);
  }

  async remove(id: Role['id']): Promise<void> {
    const entity = await this.findById(id);

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }
    if (!entity.isMutable) {
      throw new UnprocessableEntityException(exceptionResponses.Inmutable);
    }

    await this.roleRepository.delete(id);
  }
}
