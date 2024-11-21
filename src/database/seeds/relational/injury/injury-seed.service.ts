import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjuryEntity } from 'src/injuries/infrastructure/persistence/relational/entities/injury.entity';
import injuries from './injury-seed';

@Injectable()
export class InjurySeedService {
  constructor(
    @InjectRepository(InjuryEntity)
    private repository: Repository<InjuryEntity>,
  ) {}

  async run() {
    const injuryCount = await this.repository.count();
    if (injuryCount > 0) return;

    const injuryEntities: InjuryEntity[] = injuries.map((injury) => {
      return this.repository.create(injury);
    });
    await this.repository.insert(injuryEntities);
  }
}
