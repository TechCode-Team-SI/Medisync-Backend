import { Module } from '@nestjs/common';
import { ArticleCategoriesService } from './article-categories.service';
import { ArticleCategoriesController } from './article-categories.controller';
import { RelationalArticleCategoryPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { permissionsModule } from 'src/permissions/permissions.module';

@Module({
  imports: [RelationalArticleCategoryPersistenceModule, permissionsModule],
  controllers: [ArticleCategoriesController],
  providers: [ArticleCategoriesService],
  exports: [
    ArticleCategoriesService,
    RelationalArticleCategoryPersistenceModule,
  ],
})
export class ArticleCategoriesModule {}
