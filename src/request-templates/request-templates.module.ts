import { Module } from '@nestjs/common';
import { RequestTemplatesService } from './request-templates.service';
import { RequestTemplatesController } from './request-templates.controller';
import { RelationalRequestTemplatePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FieldQuestionsModule } from 'src/field-questions/field-questions.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [
    RelationalRequestTemplatePersistenceModule,
    FieldQuestionsModule,
    permissionsModule,
  ],
  controllers: [RequestTemplatesController],
  providers: [RequestTemplatesService],
  exports: [
    RequestTemplatesService,
    RelationalRequestTemplatePersistenceModule,
  ],
})
export class RequestTemplatesModule {}
