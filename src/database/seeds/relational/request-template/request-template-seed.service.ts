import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import requestTemplates from './request-template-seed';
import { RequestTemplateEntity } from 'src/request-templates/infrastructure/persistence/relational/entities/request-template.entity';

@Injectable()
export class RequestTemplateSeedService {
  constructor(
    @InjectRepository(RequestTemplateEntity)
    private repository: Repository<RequestTemplateEntity>,
  ) {}

  async run() {
    const requestTemplatesCount = await this.repository.count();
    if (requestTemplatesCount > 0) return;

    for (const template of requestTemplates) {
      const requestTemplate = this.repository.create(template);
      await this.repository.save(requestTemplate);
    }
  }
}
