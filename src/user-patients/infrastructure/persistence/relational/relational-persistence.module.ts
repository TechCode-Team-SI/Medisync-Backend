import { Module } from '@nestjs/common';
import { UserPatientRepository } from '../user-patient.repository';
import { UserPatientRelationalRepository } from './repositories/user-patient.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPatientEntity } from './entities/user-patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPatientEntity])],
  providers: [
    {
      provide: UserPatientRepository,
      useClass: UserPatientRelationalRepository,
    },
  ],
  exports: [UserPatientRepository],
})
export class RelationalUserPatientPersistenceModule {}
