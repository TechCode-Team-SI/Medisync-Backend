import { Module } from '@nestjs/common';
import { RequestTemplateRepository } from '../request-template.repository';
import { RequestTemplateRelationalRepository } from './repositories/request-template.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestTemplateEntity } from './entities/request-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestTemplateEntity])],
  providers: [
    {
      provide: RequestTemplateRepository,
      useClass: RequestTemplateRelationalRepository,
    },
  ],
  exports: [RequestTemplateRepository],
})
export class RelationalRequestTemplatePersistenceModule {}
