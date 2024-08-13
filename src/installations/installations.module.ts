import { Module } from '@nestjs/common';
import { InstallationsService } from './installations.service';
import { RelationalInstallationPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalInstallationPersistenceModule],
  providers: [InstallationsService],
  exports: [InstallationsService, RelationalInstallationPersistenceModule],
})
export class InstallationsModule {}
