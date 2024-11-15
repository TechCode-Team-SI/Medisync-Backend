import { Module } from '@nestjs/common';
import { ArticleCategoriesService } from './article-categories.service';
import { ArticleCategoriesController } from './article-categories.controller';
import { RelationalArticleCategoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalArticleCategoryPersistenceModule],
  controllers: [ArticleCategoriesController],
  providers: [ArticleCategoriesService],
  exports: [
    ArticleCategoriesService,
    RelationalArticleCategoryPersistenceModule,
  ],
})
export class ArticleCategoriesModule {}
