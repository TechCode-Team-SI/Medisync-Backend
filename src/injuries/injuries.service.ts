import { Injectable } from '@nestjs/common';
import { CreateInjuryDto } from './dto/create-injury.dto';
import { UpdateInjuryDto } from './dto/update-injury.dto';
import { InjuryRepository } from './infrastructure/persistence/injury.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Injury } from './domain/injury';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortInjuriesDto } from 'src/injuries/dto/find-all-injuries.dto';

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
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortInjuriesDto[] | null;
  }) {
    return this.injuryRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
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
}
