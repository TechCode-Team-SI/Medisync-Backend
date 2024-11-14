import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { SocketService } from './socket.service';

@Module({
  imports: [UsersModule],
  providers: [SocketService],
  exports: [SocketService],
})
export class SocketModule {}
