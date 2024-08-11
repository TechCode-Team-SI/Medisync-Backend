import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { SpecialtyRepository } from './infrastructure/persistence/specialty.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Specialty } from './domain/specialty';
import { FilesService } from 'src/files/files.service';
import { exceptionResponses } from './specialties.messages';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class SpecialtiesService {
  constructor(
    private readonly specialtyRepository: SpecialtyRepository,
    private readonly filesService: FilesService,
  ) {}

  async create(createSpecialtyDto: CreateSpecialtyDto) {
    if (createSpecialtyDto.image?.id) {
      const fileObject = await this.filesService.findById(
        createSpecialtyDto.image.id,
      );
      if (!fileObject) {
        throw new UnprocessableEntityException(
          exceptionResponses.ImageNotExist,
        );
      }
      createSpecialtyDto.image = fileObject;
    }
    return this.specialtyRepository.create(createSpecialtyDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.specialtyRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: Specialty['id'], options?: findOptions) {
    return this.specialtyRepository.findById(id, options);
  }

  update(id: Specialty['id'], updateSpecialtyDto: UpdateSpecialtyDto) {
    return this.specialtyRepository.update(id, updateSpecialtyDto);
  }

  remove(id: Specialty['id']) {
    return this.specialtyRepository.remove(id);
  }
}
