import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalCenterEntity } from '../entities/medical-center.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { MedicalCenter } from '../../../../domain/medical-center';
import { MedicalCenterRepository } from '../../medical-center.repository';
import { MedicalCenterMapper } from '../mappers/medical-center.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/medical-centers/medical-centers.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class MedicalCenterRelationalRepository
  implements MedicalCenterRepository
{
  constructor(
    @InjectRepository(MedicalCenterEntity)
    private readonly medicalCenterRepository: Repository<MedicalCenterEntity>,
  ) {}

  private relations = [];

  async create(data: MedicalCenter): Promise<MedicalCenter> {
    const persistenceModel = MedicalCenterMapper.toPersistence(data);
    const newEntity = await this.medicalCenterRepository.save(
      this.medicalCenterRepository.create(persistenceModel),
    );
    return MedicalCenterMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<MedicalCenter>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.medicalCenterRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) =>
      MedicalCenterMapper.toDomain(entity),
    );

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'medical-centers',
      },
    );
  }

  async findById(
    id: MedicalCenter['id'],
    options?: findOptions,
  ): Promise<NullableType<MedicalCenter>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.medicalCenterRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? MedicalCenterMapper.toDomain(entity) : null;
  }

  async update(
    id: MedicalCenter['id'],
    payload: Partial<MedicalCenter>,
  ): Promise<MedicalCenter> {
    const entity = await this.medicalCenterRepository.findOne({
      where: { id },
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

  async remove(id: MedicalCenter['id']): Promise<void> {
    await this.medicalCenterRepository.delete(id);
  }
}
