import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import treatments from './treatment-seed';
import { TreatmentEntity } from 'src/treatments/infrastructure/persistence/relational/entities/treatment.entity';

@Injectable()
export class TreatmentSeedService {
  constructor(
    @InjectRepository(TreatmentEntity)
    private repository: Repository<TreatmentEntity>,
  ) {}

  async run() {
    const treatmentCount = await this.repository.count();
    if (treatmentCount > 0) return;

    const treatmentEntities: TreatmentEntity[] = treatments.map((treatment) => {
      return this.repository.create(treatment);
    });
    await this.repository.insert(treatmentEntities);
  }
}
