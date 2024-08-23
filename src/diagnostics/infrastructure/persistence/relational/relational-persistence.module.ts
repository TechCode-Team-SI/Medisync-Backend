import { Module } from '@nestjs/common';
import { DiagnosticRepository } from '../diagnostic.repository';
import { DiagnosticRelationalRepository } from './repositories/diagnostic.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiagnosticEntity } from './entities/diagnostic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticEntity])],
  providers: [
    {
      provide: DiagnosticRepository,
      useClass: DiagnosticRelationalRepository,
    },
  ],
  exports: [DiagnosticRepository],
})
export class RelationalDiagnosticPersistenceModule {}
