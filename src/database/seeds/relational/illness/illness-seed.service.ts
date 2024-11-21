import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IllnessEntity } from 'src/illnesses/infrastructure/persistence/relational/entities/illness.entity';
import illnesses from './illness-seed';

@Injectable()
export class IllnessSeedService {
  constructor(
    @InjectRepository(IllnessEntity)
    private repository: Repository<IllnessEntity>,
  ) {}

  async run() {
    const illnessCount = await this.repository.count();
    if (illnessCount > 0) return;

    const illnessEntities: IllnessEntity[] = illnesses.map((illness) => {
      return this.repository.create(illness);
    });
    await this.repository.insert(illnessEntities);
  }
}
