import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RelationalRoomPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalRoomPersistenceModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService, RelationalRoomPersistenceModule],
})
export class RoomsModule {}
