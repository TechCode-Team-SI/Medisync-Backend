import { Module } from '@nestjs/common';
import { ArticleRepository } from '../article.repository';
import { ArticleRelationalRepository } from './repositories/article.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [
    {
      provide: ArticleRepository,
      useClass: ArticleRelationalRepository,
    },
  ],
  exports: [ArticleRepository],
})
export class RelationalArticlePersistenceModule {}
