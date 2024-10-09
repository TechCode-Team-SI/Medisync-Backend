import { Injectable } from '@nestjs/common';
import { CreatetreatmentDto } from './dto/create-treatment.dto';
import { UpdatetreatmentDto } from './dto/update-treatment.dto';
import { TreatmentRepository } from './infrastructure/persistence/treatment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Treatment } from './domain/treatment';
import { findOptions } from 'src/utils/types/fine-options.type';
import {
  FilterTreatmentsDto,
  SortTreatmentsDto,
} from 'src/treatments/dto/find-all-treatments.dto';

@Injectable()
export class TreatmentsService {
  constructor(private readonly TreatmentRepository: TreatmentRepository) {}

  create(createtreatmentDto: CreatetreatmentDto) {
    return this.TreatmentRepository.create(createtreatmentDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
    filterOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortTreatmentsDto[] | null;
    filterOptions?: FilterTreatmentsDto | null;
  }) {
    return this.TreatmentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
      filterOptions,
    });
  }

  findOne(id: Treatment['id'], options?: findOptions) {
    return this.TreatmentRepository.findById(id, options);
  }

  update(id: Treatment['id'], updatetreatmentDto: UpdatetreatmentDto) {
    return this.TreatmentRepository.update(id, updatetreatmentDto);
  }

  remove(id: Treatment['id']) {
    return this.TreatmentRepository.remove(id);
  }

  findMany(ids: Treatment['id'][], options?: findOptions) {
    return this.TreatmentRepository.findManyByIds(ids, options);
  }
}
