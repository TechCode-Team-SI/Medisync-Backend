import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DiagnosticsService } from './diagnostics.service';
import { RelationalDiagnosticPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { IllnessesModule } from 'src/illnesses/illnesses.module';
import { InjuriesModule } from 'src/injuries/injuries.module';
import { SymptomsModule } from 'src/symptoms/symptoms.module';
import { treatmentsModule } from 'src/treatments/treatments.module';

@Module({
  imports: [
    RelationalDiagnosticPersistenceModule,
    UsersModule,
    IllnessesModule,
    InjuriesModule,
    SymptomsModule,
    treatmentsModule,
  ],
  providers: [DiagnosticsService],
  exports: [DiagnosticsService, RelationalDiagnosticPersistenceModule],
})
export class DiagnosticsModule {}
