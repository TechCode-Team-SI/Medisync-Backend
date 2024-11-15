// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateArticleCategoryDto } from './create-article-category.dto';

export class UpdateArticleCategoryDto extends PartialType(
  CreateArticleCategoryDto,
) {}
