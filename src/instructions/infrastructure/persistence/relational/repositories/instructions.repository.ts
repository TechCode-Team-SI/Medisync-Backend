import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstructionsEntity } from '../entities/instructions.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Instructions } from '../../../../domain/instructions';
import { InstructionsRepository } from '../../instructions.repository';
import { InstructionsMapper } from '../mappers/instructions.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { exceptionResponses } from 'src/instructions/instructions.messages';
import { PaginationResponseDto } from 'src/utils/dto/pagination-response.dto';
import { Pagination } from 'src/utils/pagination';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class InstructionsRelationalRepository
  implements InstructionsRepository
{
  constructor(
    @InjectRepository(InstructionsEntity)
    private readonly instructionsRepository: Repository<InstructionsEntity>,
  ) {}

  private relations = [];

  async create(data: Instructions): Promise<Instructions> {
    const persistenceModel = InstructionsMapper.toPersistence(data);
    const newEntity = await this.instructionsRepository.save(
      this.instructionsRepository.create(persistenceModel),
    );
    return InstructionsMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }): Promise<PaginationResponseDto<Instructions>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const [entities, count] = await this.instructionsRepository.findAndCount({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations,
    });
    const items = entities.map((entity) => InstructionsMapper.toDomain(entity));

    return Pagination(
      { items, count },
      {
        limit: paginationOptions.limit,
        page: paginationOptions.page,
        domain: 'instructions',
      },
    );
  }

  async findById(
    id: Instructions['id'],
    options?: findOptions,
  ): Promise<NullableType<Instructions>> {
    let relations = this.relations;
    if (options?.minimal) relations = [];

    const entity = await this.instructionsRepository.findOne({
      where: { id },
      relations,
    });

    return entity ? InstructionsMapper.toDomain(entity) : null;
  }

  async update(
    id: Instructions['id'],
    payload: Partial<Instructions>,
  ): Promise<Instructions> {
    const entity = await this.instructionsRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException(exceptionResponses.NotFound);
    }

    const updatedEntity = await this.instructionsRepository.save(
      this.instructionsRepository.create(
        InstructionsMapper.toPersistence({
          ...InstructionsMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return InstructionsMapper.toDomain(updatedEntity);
  }

  async remove(id: Instructions['id']): Promise<void> {
    await this.instructionsRepository.delete(id);
  }
}
