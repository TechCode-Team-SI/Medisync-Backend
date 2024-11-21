import { Module } from '@nestjs/common';
import { PathologyRepository } from '../pathology.repository';
import { PathologyRelationalRepository } from './repositories/pathology.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PathologyEntity } from './entities/pathology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PathologyEntity])],
  providers: [
    {
      provide: PathologyRepository,
      useClass: PathologyRelationalRepository,
    },
  ],
  exports: [PathologyRepository],
})
export class RelationalPathologyPersistenceModule {}
