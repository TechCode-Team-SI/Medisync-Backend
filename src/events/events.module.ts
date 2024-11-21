import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { EventsService } from './events.service';

@Module({
  imports: [UsersModule],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
