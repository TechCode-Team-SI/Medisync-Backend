import { Injectable } from '@nestjs/common';
import { CreateSymptomDto } from './dto/create-symptom.dto';
import { UpdateSymptomDto } from './dto/update-symptom.dto';
import { SymptomRepository } from './infrastructure/persistence/symptom.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Symptom } from './domain/symptom';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortSymptomsDto } from 'src/symptoms/dto/find-all-symptoms.dto';

@Injectable()
export class SymptomsService {
  constructor(private readonly symptomRepository: SymptomRepository) {}

  create(createSymptomDto: CreateSymptomDto) {
    return this.symptomRepository.create(createSymptomDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortSymptomsDto[] | null;
  }) {
    return this.symptomRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: Symptom['id'], options?: findOptions) {
    return this.symptomRepository.findById(id, options);
  }

  update(id: Symptom['id'], updateSymptomDto: UpdateSymptomDto) {
    return this.symptomRepository.update(id, updateSymptomDto);
  }

  remove(id: Symptom['id']) {
    return this.symptomRepository.remove(id);
  }
}
