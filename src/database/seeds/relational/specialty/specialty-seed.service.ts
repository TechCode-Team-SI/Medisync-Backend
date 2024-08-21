import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecialtyEntity } from 'src/specialties/infrastructure/persistence/relational/entities/specialty.entity';
import specialties from './specialty-seed';

@Injectable()
export class SpecialtySeedService {
  constructor(
    @InjectRepository(SpecialtyEntity)
    private repository: Repository<SpecialtyEntity>,
  ) {}

  async run() {
    const specialtyCount = await this.repository.count();
    if (specialtyCount > 0) return;

    const specialtyEntities: SpecialtyEntity[] = specialties.map(
      (specialty) => {
        return this.repository.create(specialty);
      },
    );
    await this.repository.insert(specialtyEntities);
  }
}
