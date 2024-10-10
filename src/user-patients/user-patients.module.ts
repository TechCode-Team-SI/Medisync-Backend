import { Module } from '@nestjs/common';
import { UserPatientsService } from './user-patients.service';
import { RelationalUserPatientPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalUserPatientPersistenceModule],
  providers: [UserPatientsService],
  exports: [UserPatientsService, RelationalUserPatientPersistenceModule],
})
export class UserPatientsModule {}
