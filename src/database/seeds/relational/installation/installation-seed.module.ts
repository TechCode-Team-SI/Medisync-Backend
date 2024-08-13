import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionEntity } from 'src/permissions/infrastructure/persistence/relational/entities/permission.entity';
import { InstallationSeedService } from './installation-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionEntity])],
  providers: [InstallationSeedService],
  exports: [InstallationSeedService],
})
export class PermissionSeedModule {}
