import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { RelationalSpecialtyPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';
import { RequestTemplatesModule } from 'src/request-templates/request-templates.module';

@Module({
  imports: [
    RelationalSpecialtyPersistenceModule,
    FilesModule,
    UsersModule,
    RequestTemplatesModule,
  ],
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  exports: [SpecialtiesService, RelationalSpecialtyPersistenceModule],
})
export class SpecialtiesModule {}
