import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { RelationalArticlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [RelationalArticlePersistenceModule, UsersModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, RelationalArticlePersistenceModule],
})
export class ArticlesModule {}
