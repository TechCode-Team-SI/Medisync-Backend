import { forwardRef, Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { RelationalTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from 'src/users/users.module';
import { TicketCommentsModule } from 'src/ticket-comments/ticket-comments.module';

@Module({
  imports: [
    RelationalTicketPersistenceModule,
    UsersModule,
    forwardRef(() => TicketCommentsModule),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService, RelationalTicketPersistenceModule],
})
export class TicketsModule {}
