import { forwardRef, Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { RelationalTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from 'src/users/users.module';
import { TicketCommentsModule } from 'src/ticket-comments/ticket-comments.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { TicketTypesModule } from 'src/ticket-types/ticket-types.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    RelationalTicketPersistenceModule,
    UsersModule,
    permissionsModule,
    forwardRef(() => TicketCommentsModule),
    TicketTypesModule,
    NotificationsModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService, RelationalTicketPersistenceModule],
})
export class TicketsModule {}
