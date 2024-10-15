import { Injectable } from '@nestjs/common';
import { CreatePathologyDto } from './dto/create-pathology.dto';
import { UpdatePathologyDto } from './dto/update-pathology.dto';
import { PathologyRepository } from './infrastructure/persistence/pathology.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Pathology } from './domain/pathology';
import { findOptions } from 'src/utils/types/fine-options.type';
import { SortPathologiesDto } from 'src/pathologies/dto/find-all-pathologies.dto';
import { CreateMultiplePathologyDto } from './dto/create-multiple-pathology.dto';

@Injectable()
export class PathologiesService {
  constructor(private readonly pathologyRepository: PathologyRepository) {}

  create(createPathologyDto: CreatePathologyDto) {
    return this.pathologyRepository.create(createPathologyDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
    sortOptions,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
    sortOptions?: SortPathologiesDto[] | null;
  }) {
    return this.pathologyRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
      sortOptions,
    });
  }

  findOne(id: Pathology['id'], options?: findOptions) {
    return this.pathologyRepository.findById(id, options);
  }

  update(id: Pathology['id'], updatePathologyDto: UpdatePathologyDto) {
    return this.pathologyRepository.update(id, updatePathologyDto);
  }

  remove(id: Pathology['id']) {
    return this.pathologyRepository.remove(id);
  }

  createMultiple({ pathologies }: CreateMultiplePathologyDto) {
    return this.pathologyRepository.createMultiple(pathologies);
  }

  findAllWithNames(names: string[], options?: findOptions) {
    return this.pathologyRepository.findAllWithNames(names, options);
  }
}
