import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeProfileEntity } from '../entities/employee-profile.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { EmployeeProfile } from '../../../../domain/employee-profile';
import { EmployeeProfileRepository } from '../../employee-profile.repository';
import { EmployeeProfileMapper } from '../mappers/employee-profile.mapper';
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
}
