import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import fileConfig from './files/config/file.config';
import { FilesModule } from './files/files.module';
import { HomeModule } from './home/home.module';
import mailConfig from './mail/config/mail.config';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { SessionModule } from './session/session.module';
import { UsersModule } from './users/users.module';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { permissionsModule } from './permissions/permissions.module';

import { RolesModule } from './roles/roles.module';

import { ArticlesModule } from './articles/articles.module';

import { SpecialtiesModule } from './specialties/specialties.module';

import { TicketsModule } from './tickets/tickets.module';

import { TicketCommentsModule } from './ticket-comments/ticket-comments.module';

import { InstallationsModule } from './installations/installations.module';
import { APP_GUARD } from '@nestjs/core';
import { InstallationsGuard } from './installations/installations.guard';

import { FieldQuestionsModule } from './field-questions/field-questions.module';

import { RequestTemplatesModule } from './request-templates/request-templates.module';

import { MedicalCentersModule } from './medical-centers/medical-centers.module';

import { RoomsModule } from './rooms/rooms.module';

import { EmployeeProfilesModule } from './employee-profiles/employee-profiles.module';

@Module({
  imports: [
    EmployeeProfilesModule,
    RoomsModule,
    MedicalCentersModule,
    RequestTemplatesModule,
    FieldQuestionsModule,
    InstallationsModule,
    TicketCommentsModule,
    TicketsModule,
    SpecialtiesModule,
    ArticlesModule,
    RolesModule,
    permissionsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    UsersModule,
    FilesModule,
    AuthModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: InstallationsGuard,
    },
  ],
})
export class AppModule {}
