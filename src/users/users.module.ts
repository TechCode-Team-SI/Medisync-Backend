import { Module } from '@nestjs/common';

import { UsersController } from './users.controller';

import { RolesModule } from 'src/roles/roles.module';
import { FilesModule } from '../files/files.module';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersService } from './users.service';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule, RolesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, infrastructurePersistenceModule],
})
export class UsersModule {}
