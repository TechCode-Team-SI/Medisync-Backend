import { Module } from '@nestjs/common';
import { TicketTypeRepository } from '../ticket-type.repository';
import { TicketTypeRelationalRepository } from './repositories/ticket-type.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketTypeEntity } from './entities/ticket-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketTypeEntity])],
  providers: [
    {
      provide: TicketTypeRepository,
      useClass: TicketTypeRelationalRepository,
    },
  ],
  exports: [TicketTypeRepository],
})
export class RelationalTicketTypePersistenceModule {}
