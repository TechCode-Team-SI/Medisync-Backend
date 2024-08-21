import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EmployeeProfile } from '../../../../domain/employee-profile';
import { EmployeeProfileRepository } from '../../employee-profile.repository';
import { EmployeeProfileMapper } from '../mappers/employee-profile.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/employee-profiles/employee-profiles.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class EmployeeProfileRelationalRepository
  implements EmployeeProfileRepository
{
  constructor(
    @InjectRepository(EmployeeProfileEntity)
    private readonly employeeProfileRepository: Repository<EmployeeProfileEntity>,
  ) {}

  private relations = [];

  async create(data: EmployeeProfile): Promise<EmployeeProfile> {
    const persistenceModel = EmployeeProfileMapper.toPersistence(data);
    const newEntity = await this.employeeProfileRepository.save(
      this.employeeProfileRepository.create(persistenceModel),
    );
    return EmployeeProfileMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<EmployeeProfile>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.employeeProfileRepository.findAndCount(
      {
        skip: (paginationOptions.page - 1) * paginationOptions.limit,
        take: paginationOptions.limit,
        relations,
      },
    );
    const items = entities.map((entity) =>
      EmployeeProfileMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'employee-profiles',
      },
    );
  }

  async findById(
    id: EmployeeProfile['id'],
    options?: findOptions,
  ): Promise<NullableType<EmployeeProfile>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

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

  async remove(id: EmployeeProfile['id']): Promise<void> {
    await this.employeeProfileRepository.delete(id);
  }
}
