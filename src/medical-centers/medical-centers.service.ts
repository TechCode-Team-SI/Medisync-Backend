import { Injectable } from '@nestjs/common';
import { CreateMedicalCenterDto } from './dto/create-medical-center.dto';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';
import { MedicalCenterRepository } from './infrastructure/persistence/medical-center.repository';
import { findOptions } from 'src/utils/types/fine-options.type';

@Injectable()
export class MedicalCentersService {
  constructor(
    private readonly medicalCenterRepository: MedicalCenterRepository,
  ) {}

  create(createMedicalCenterDto: CreateMedicalCenterDto) {
    return this.medicalCenterRepository.create(createMedicalCenterDto);
  }

  findOne(options?: findOptions) {
    return this.medicalCenterRepository.findById(options);
  }

  update(updateMedicalCenterDto: UpdateMedicalCenterDto) {
    return this.medicalCenterRepository.update(updateMedicalCenterDto);
  }

  remove() {
    return this.medicalCenterRepository.remove();
  }
}
