import { Module } from '@nestjs/common';
import { PackageRepository } from '../package.repository';
import { PackageRelationalRepository } from './repositories/package.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageEntity } from './entities/package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageEntity])],
  providers: [
    {
      provide: PackageRepository,
      useClass: PackageRelationalRepository,
    },
  ],
  exports: [PackageRepository],
})
export class RelationalPackagePersistenceModule {}
