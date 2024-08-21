import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, DataSourceOptions } from 'typeorm';
import appConfig from '../../../config/app.config';
import databaseConfig from '../../config/database.config';
import { TypeOrmConfigService } from '../../typeorm-config.service';
import { InstallationSeedModule } from './installation/installation-seed.module';
import { PermissionSeedModule } from './permission/permission-seed.module';
import { RoleSeedModule } from './role/role-seed.module';
import { UserSeedModule } from './user/user-seed.module';
import { FieldQuestionSeedModule } from './question/question-seed.module';
import { RequestTemplateSeedModule } from './request-template/request-template-seed.module';
import { SpecialtySeedModule } from './specialty/specialty-seed.module';

@Module({
  imports: [
    RoleSeedModule,
    UserSeedModule,
    PermissionSeedModule,
    InstallationSeedModule,
    FieldQuestionSeedModule,
    RequestTemplateSeedModule,
    SpecialtySeedModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
  ],
})
export class SeedModule {}
