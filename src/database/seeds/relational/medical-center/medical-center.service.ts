import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalCenterEntity } from 'src/medical-centers/infrastructure/persistence/relational/entities/medical-center.entity';
import { medicalCenter } from './medical-center-seed';

@Injectable()
export class MedicalCenterSeedService {
  constructor(
    @InjectRepository(MedicalCenterEntity)
    private repository: Repository<MedicalCenterEntity>,
  ) {}

  async run() {
    const MedicalCenterCount = await this.repository.count();
    if (MedicalCenterCount > 0) return;

    const medicalCenterEntitiy: MedicalCenterEntity =
      this.repository.create(medicalCenter);
    await this.repository.insert(medicalCenterEntitiy);
  }
}
