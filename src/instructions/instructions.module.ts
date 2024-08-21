import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { RelationalInstructionsPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { InstructionsService } from './instructions.service';

@Module({
  imports: [RelationalInstructionsPersistenceModule, UsersModule],
  providers: [InstructionsService],
  exports: [InstructionsService, RelationalInstructionsPersistenceModule],
})
export class InstructionsModule {}
