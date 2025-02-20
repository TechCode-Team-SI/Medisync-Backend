import { Module } from '@nestjs/common';
import { InstallationsService } from './installations.service';
import { RelationalInstallationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';
import { MedicalCentersModule } from 'src/medical-centers/medical-centers.module';
import { InstallationsController } from './installations.controller';
import { PackagesModule } from 'src/packages/packages.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    RelationalInstallationPersistenceModule,
    UsersModule,
    RolesModule,
    MedicalCentersModule,
    PackagesModule,
    ConfigModule,
    AuthModule,
  ],
  controllers: [InstallationsController],
  providers: [InstallationsService],
  exports: [InstallationsService, RelationalInstallationPersistenceModule],
})
export class InstallationsModule {}
