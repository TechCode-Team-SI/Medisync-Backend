import { Injectable } from '@nestjs/common';
import { CreateMedicalCenterDto } from './dto/create-medical-center.dto';
import { UpdateMedicalCenterDto } from './dto/update-medical-center.dto';
import { MedicalCenterRepository } from './infrastructure/persistence/medical-center.repository';
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
