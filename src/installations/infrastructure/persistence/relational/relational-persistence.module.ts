import { Module } from '@nestjs/common';
import { InstallationRepository } from '../installation.repository';
import { InstallationRelationalRepository } from './repositories/installation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstallationEntity } from './entities/installation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstallationEntity])],
  providers: [
    {
      provide: InstallationRepository,
      useClass: InstallationRelationalRepository,
    },
  ],
  exports: [InstallationRepository],
})
export class RelationalInstallationPersistenceModule {}
