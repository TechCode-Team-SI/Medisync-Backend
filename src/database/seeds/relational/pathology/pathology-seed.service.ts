import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PathologyEntity } from 'src/pathologies/infrastructure/persistence/relational/entities/pathology.entity';
import pathologies from './pathology-seed';

@Injectable()
export class PathologySeedService {
  constructor(
    @InjectRepository(PathologyEntity)
    private repository: Repository<PathologyEntity>,
  ) {}

  async run() {
    const pathologyCount = await this.repository.count();
    if (pathologyCount > 0) return;

    const pathologyEntities: PathologyEntity[] = pathologies.map(
      (pathology) => {
        return this.repository.create(pathology);
      },
    );
    await this.repository.insert(pathologyEntities);
  }
}
