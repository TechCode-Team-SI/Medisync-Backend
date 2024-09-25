import { Injectable } from '@nestjs/common';
import { CreatetreatmentDto } from './dto/create-treatment.dto';
import { UpdatetreatmentDto } from './dto/update-treatment.dto';
import { treatmentRepository } from './infrastructure/persistence/treatment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { treatment } from './domain/treatment';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SorttreatmentsDto } from 'src/treatments/dto/find-all-treatments.dto';

@Injectable()
export class treatmentsService {
  constructor(private readonly treatmentRepository: treatmentRepository) {}

  create(createtreatmentDto: CreatetreatmentDto) {
    return this.treatmentRepository.create(createtreatmentDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SorttreatmentsDto[] | null;
  }) {
    return this.treatmentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: treatment['id'], options?: findOptions) {
    return this.treatmentRepository.findById(id, options);
  }

  update(id: treatment['id'], updatetreatmentDto: UpdatetreatmentDto) {
    return this.treatmentRepository.update(id, updatetreatmentDto);
  }

  remove(id: treatment['id']) {
    return this.treatmentRepository.remove(id);
  }
}
