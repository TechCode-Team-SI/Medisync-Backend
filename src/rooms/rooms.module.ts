import { Module } from '@nestjs/common';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { UsersModule } from 'src/users/users.module';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RelationalRoomPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalRoomPersistenceModule, SpecialtiesModule, UsersModule],
  controllers: [RoomsController],
  providers: [RoomsService],
  exports: [RoomsService, RelationalRoomPersistenceModule],
})
export class RoomsModule {}
