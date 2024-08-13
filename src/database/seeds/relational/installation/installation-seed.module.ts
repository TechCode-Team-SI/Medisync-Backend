import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstallationSeedService } from './installation-seed.service';
import { InstallationEntity } from 'src/installations/infrastructure/persistence/relational/entities/installation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstallationEntity])],
  providers: [InstallationSeedService],
  exports: [InstallationSeedService],
})
export class InstallationSeedModule {}
