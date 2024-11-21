import { Module } from '@nestjs/common';
import { AgendaRepository } from '../agenda.repository';
import { AgendaRelationalRepository } from './repositories/agenda.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgendaEntity } from './entities/agenda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgendaEntity])],
  providers: [
    {
      provide: AgendaRepository,
      useClass: AgendaRelationalRepository,
    },
  ],
  exports: [AgendaRepository],
})
export class RelationalAgendaPersistenceModule {}
