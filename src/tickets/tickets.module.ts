import { BullModule } from '@nestjs/bullmq';
import { forwardRef, Module } from '@nestjs/common';
import { permissionsModule } from 'src/permissions/permissions.module';
import { TicketCommentsModule } from 'src/ticket-comments/ticket-comments.module';
import { TicketTypesModule } from 'src/ticket-types/ticket-types.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { RelationalTicketPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [
    RelationalTicketPersistenceModule,
    UsersModule,
    permissionsModule,
    forwardRef(() => TicketCommentsModule),
    TicketTypesModule,
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService, RelationalTicketPersistenceModule],
})
export class TicketsModule {}
