import { Injectable } from '@nestjs/common';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { InjuryRepository } from './infrastructure/persistence/injury.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Injury } from './domain/injury';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterInjuriesDto,
  SortInjuriesDto,
} from 'src/injuries/dto/find-all-injuries.dto';
import { CreateMultipleInjuriesDto } from './dto/create-multiple-injuries.dto';

@Injectable()
export class InjuriesService {
  constructor(private readonly injuryRepository: InjuryRepository) {}

  create(createInjuryDto: CreateInjuryDto) {
    return this.injuryRepository.create(createInjuryDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortInjuriesDto[] | null;
    filterOptions?: FilterInjuriesDto | null;
  }) {
    return this.injuryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Injury['id'], options?: findOptions) {
    return this.injuryRepository.findById(id, options);
  }

  update(id: Injury['id'], updateInjuryDto: UpdateInjuryDto) {
    return this.injuryRepository.update(id, updateInjuryDto);
  }

  remove(id: Injury['id']) {
    return this.injuryRepository.remove(id);
  }

  findMany(ids: Injury['id'][], options?: findOptions) {
    return this.injuryRepository.findManyByIds(ids, options);
  }

  createMultiple({ injuries }: CreateMultipleInjuriesDto) {
    return this.injuryRepository.createMultiple(injuries);
  }

  findAllWithNames(names: string[], options?: findOptions) {
    return this.injuryRepository.findAllWithNames(names, options);
  }
}
