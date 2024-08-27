import { Module } from '@nestjs/common';
import { RoomRepository } from '../room.repository';
import { RoomRelationalRepository } from './repositories/room.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  providers: [
    {
      provide: RoomRepository,
      useClass: RoomRelationalRepository,
    },
  ],
  exports: [RoomRepository],
})
export class RelationalRoomPersistenceModule {}
