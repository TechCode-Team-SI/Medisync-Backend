import { Module } from '@nestjs/common';
import { InstructionsRepository } from '../instructions.repository';
import { InstructionsRelationalRepository } from './repositories/instructions.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructionsEntity } from './entities/instructions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstructionsEntity])],
  providers: [
    {
      provide: InstructionsRepository,
      useClass: InstructionsRelationalRepository,
    },
  ],
  exports: [InstructionsRepository],
})
export class RelationalInstructionsPersistenceModule {}
