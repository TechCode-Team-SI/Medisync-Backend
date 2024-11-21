import { Module } from '@nestjs/common';
import { ArticleCategoryRepository } from '../article-category.repository';
import { ArticleCategoryRelationalRepository } from './repositories/article-category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleCategoryEntity } from './entities/article-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCategoryEntity])],
  providers: [
    {
      provide: ArticleCategoryRepository,
      useClass: ArticleCategoryRelationalRepository,
    },
  ],
  exports: [ArticleCategoryRepository],
})
export class RelationalArticleCategoryPersistenceModule {}
