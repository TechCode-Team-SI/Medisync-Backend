import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { DiagnosticsService } from './diagnostics.service';
import { RelationalDiagnosticPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalDiagnosticPersistenceModule, UsersModule],
  providers: [DiagnosticsService],
  exports: [DiagnosticsService, RelationalDiagnosticPersistenceModule],
})
export class DiagnosticsModule {}
