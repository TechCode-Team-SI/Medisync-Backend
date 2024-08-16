import { Injectable } from '@nestjs/common';
import { CreateMedicalCenterDto } from './dto/create-medical-center.dto';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';
import { MedicalCenterRepository } from './infrastructure/persistence/medical-center.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { MedicalCenter } from './domain/medical-center';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class MedicalCentersService {
  constructor(
    private readonly medicalCenterRepository: MedicalCenterRepository,
  ) {}

  create(createMedicalCenterDto: CreateMedicalCenterDto) {
    return this.medicalCenterRepository.create(createMedicalCenterDto);
  }

  findAllWithPagination({
    paginationOptions,
    options,
  }: {
    paginationOptions: IPaginationOptions;
    options?: findOptions;
  }) {
    return this.medicalCenterRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      options,
    });
  }

  findOne(id: MedicalCenter['id'], options?: findOptions) {
    return this.medicalCenterRepository.findById(id, options);
  }

  update(
    id: MedicalCenter['id'],
    updateMedicalCenterDto: UpdateMedicalCenterDto,
  ) {
    return this.medicalCenterRepository.update(id, updateMedicalCenterDto);
  }

  remove(id: MedicalCenter['id']) {
    return this.medicalCenterRepository.remove(id);
  }
}
