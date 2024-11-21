import { forwardRef, Module } from '@nestjs/common';
import { TicketsModule } from 'src/tickets/tickets.module';
import { UsersModule } from 'src/users/users.module';
import { RelationalTicketCommentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TicketCommentsService } from './ticket-comments.service';

@Module({
  imports: [
    RelationalTicketCommentPersistenceModule,
    UsersModule,
    forwardRef(() => TicketsModule),
  ],
  providers: [TicketCommentsService],
  exports: [TicketCommentsService, RelationalTicketCommentPersistenceModule],
})
export class TicketCommentsModule {}
