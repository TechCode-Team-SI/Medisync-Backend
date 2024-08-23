import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageEntity } from 'src/packages/infrastructure/persistence/relational/entities/package.entity';
import packages from './package-seed';

@Injectable()
export class PackageSeedService {
  constructor(
    @InjectRepository(PackageEntity)
    private repository: Repository<PackageEntity>,
  ) {}

  async run() {
    const packageCount = await this.repository.count();
    if (packageCount > 0) return;

    const packageEntities: PackageEntity[] = packages.map((currentPackage) => {
      return this.repository.create({
        name: currentPackage.name,
        slug: currentPackage.slug,
        applied: false,
      });
    });
    await this.repository.insert(packageEntities);
  }
}
