import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestTemplateSeedService } from './request-template-seed.service';
import { RequestTemplateEntity } from 'src/request-templates/infrastructure/persistence/relational/entities/request-template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestTemplateEntity])],
  providers: [RequestTemplateSeedService],
  exports: [RequestTemplateSeedService],
})
export class RequestTemplateSeedModule {}
