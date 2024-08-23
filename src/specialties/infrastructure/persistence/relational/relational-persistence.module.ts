import { Module } from '@nestjs/common';
import { SpecialtyRepository } from '../specialty.repository';
import { SpecialtyRelationalRepository } from './repositories/specialty.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyEntity } from './entities/specialty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpecialtyEntity])],
  providers: [
    {
      provide: SpecialtyRepository,
      useClass: SpecialtyRelationalRepository,
    },
  ],
  exports: [SpecialtyRepository],
})
export class RelationalSpecialtyPersistenceModule {}
