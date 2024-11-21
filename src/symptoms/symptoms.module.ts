import { Module } from '@nestjs/common';
import { SymptomsService } from './symptoms.service';
import { SymptomsController } from './symptoms.controller';
import { RelationalSymptomPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from 'src/users/users.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationalSymptomPersistenceModule, UsersModule, permissionsModule],
  controllers: [SymptomsController],
  providers: [SymptomsService],
  exports: [SymptomsService, RelationalSymptomPersistenceModule],
})
export class SymptomsModule {}
