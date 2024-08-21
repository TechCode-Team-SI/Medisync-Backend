import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { RelationalRequestPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { RequestTemplatesModule } from 'src/request-templates/request-templates.module';
import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    RelationalRequestPersistenceModule,
    RequestTemplatesModule,
    SpecialtiesModule,
    UsersModule,
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService, RelationalRequestPersistenceModule],
})
export class RequestsModule {}
