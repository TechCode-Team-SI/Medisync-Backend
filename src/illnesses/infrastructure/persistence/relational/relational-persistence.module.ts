import { Module } from '@nestjs/common';
import { IllnessRepository } from '../illness.repository';
import { IllnessRelationalRepository } from './repositories/illness.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IllnessEntity } from './entities/illness.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IllnessEntity])],
  providers: [
    {
      provide: IllnessRepository,
      useClass: IllnessRelationalRepository,
    },
  ],
  exports: [IllnessRepository],
})
export class RelationalIllnessPersistenceModule {}
