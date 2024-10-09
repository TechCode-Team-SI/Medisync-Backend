import { Injectable } from '@nestjs/common';
import { CreateIllnessDto } from './dto/create-illness.dto';
import { UpdateIllnessDto } from './dto/update-illness.dto';
import { IllnessRepository } from './infrastructure/persistence/illness.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Illness } from './domain/illness';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterIllnessesDto,
  SortIllnessesDto,
} from 'src/illnesses/dto/find-all-illnesses.dto';

@Injectable()
export class IllnessesService {
  constructor(private readonly illnessRepository: IllnessRepository) {}

  create(createIllnessDto: CreateIllnessDto) {
    return this.illnessRepository.create(createIllnessDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortIllnessesDto[] | null;
    filterOptions?: FilterIllnessesDto | null;
  }) {
    return this.illnessRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Illness['id'], options?: findOptions) {
    return this.illnessRepository.findById(id, options);
  }

  update(id: Illness['id'], updateIllnessDto: UpdateIllnessDto) {
    return this.illnessRepository.update(id, updateIllnessDto);
  }

  remove(id: Illness['id']) {
    return this.illnessRepository.remove(id);
  }

  findMany(ids: Illness['id'][], options?: findOptions) {
    return this.illnessRepository.findManyByIds(ids, options);
  }
}
