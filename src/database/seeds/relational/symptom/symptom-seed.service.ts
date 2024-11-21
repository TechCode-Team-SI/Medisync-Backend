import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SymptomEntity } from 'src/symptoms/infrastructure/persistence/relational/entities/symptom.entity';
import symptoms from './symptom-seed';

@Injectable()
export class SymptomSeedService {
  constructor(
    @InjectRepository(SymptomEntity)
    private repository: Repository<SymptomEntity>,
  ) {}

  async run() {
    const symptomCount = await this.repository.count();
    if (symptomCount > 0) return;

    const symptomEntities: SymptomEntity[] = symptoms.map((symptom) => {
      return this.repository.create(symptom);
    });
    await this.repository.insert(symptomEntities);
  }
}
