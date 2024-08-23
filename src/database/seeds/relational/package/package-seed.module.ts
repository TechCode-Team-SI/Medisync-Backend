import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageSeedService } from './package-seed.service';
import { PackageEntity } from 'src/packages/infrastructure/persistence/relational/entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity])],
  providers: [PackageSeedService],
  exports: [PackageSeedService],
})
export class PackageSeedModule {}
