import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { RelationalArticlePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { permissionsModule } from 'src/permissions/permissions.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    RelationalArticlePersistenceModule,
    UsersModule,
    NotificationsModule,
    permissionsModule,
    FilesModule,
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService, RelationalArticlePersistenceModule],
})
export class ArticlesModule {}
