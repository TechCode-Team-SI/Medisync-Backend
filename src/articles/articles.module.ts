import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ArticleCategoriesModule } from 'src/article-categories/article-categories.module';
import { FilesModule } from 'src/files/files.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { UsersModule } from 'src/users/users.module';
import { QueueName } from 'src/utils/queue-enum';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { RelationalArticlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    RelationalArticlePersistenceModule,
    UsersModule,
    permissionsModule,
    FilesModule,
    ArticleCategoriesModule,
    BullModule.registerQueue({ name: QueueName.NOTIFICATION }),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, RelationalArticlePersistenceModule],
})
export class ArticlesModule {}
