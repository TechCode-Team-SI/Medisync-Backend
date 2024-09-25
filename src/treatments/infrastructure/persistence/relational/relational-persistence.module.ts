import { Module } from '@nestjs/common';
import { treatmentRepository } from '../treatment.repository';
import { treatmentRelationalRepository } from './repositories/treatment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { treatmentEntity } from './entities/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([treatmentEntity])],
  providers: [
    {
      provide: treatmentRepository,
      useClass: treatmentRelationalRepository,
    },
  ],
  exports: [treatmentRepository],
})
export class RelationaltreatmentPersistenceModule {}
