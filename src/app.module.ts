import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AgendasModule } from './agendas/agendas.module';
import { ArticlesModule } from './articles/articles.module';
import { AuthModule } from './auth/auth.module';
import authConfig from './auth/config/auth.config';
import { SystemGuard } from './common/system.guard';
import appConfig from './config/app.config';
import databaseConfig from './database/config/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { DaysOffsModule } from './days-offs/days-offs.module';
import { DiagnosticsModule } from './diagnostics/diagnostics.module';
import { EmployeeProfilesModule } from './employee-profiles/employee-profiles.module';
import { FieldQuestionsModule } from './field-questions/field-questions.module';
import fileConfig from './files/config/file.config';
import { FilesModule } from './files/files.module';
import { HomeModule } from './home/home.module';
import { IllnessesModule } from './illnesses/illnesses.module';
import { InjuriesModule } from './injuries/injuries.module';
import { InstallationsModule } from './installations/installations.module';
import { InstructionsModule } from './instructions/instructions.module';
import mailConfig from './mail/config/mail.config';
import { MailModule } from './mail/mail.module';
import { MailerModule } from './mailer/mailer.module';
import { MedicalCentersModule } from './medical-centers/medical-centers.module';
import { NotificationUsersModule } from './notification-users/notification-users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PackagesModule } from './packages/packages.module';
import { PathologiesModule } from './pathologies/pathologies.module';
import { permissionsModule } from './permissions/permissions.module';
import { RatingsModule } from './ratings/ratings.module';
import { RequestTemplatesModule } from './request-templates/request-templates.module';
import { RequestsModule } from './requests/requests.module';
import { RolesModule } from './roles/roles.module';
import { RoomsModule } from './rooms/rooms.module';
import { SessionModule } from './session/session.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SymptomsModule } from './symptoms/symptoms.module';
import { TicketCommentsModule } from './ticket-comments/ticket-comments.module';
import { TicketsModule } from './tickets/tickets.module';
import { treatmentsModule } from './treatments/treatments.module';
import { UsersModule } from './users/users.module';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { UserPatientsModule } from './user-patients/user-patients.module';

import { StatisticsMetadataModule } from './statistics-metadata/statistics-metadata.module';

//import { EventsModule } from './events/events.module';
import { SocketModule } from './socket/socket.module';
import { TicketTypesModule } from './ticket-types/ticket-types.module';

import { ArticleCategoriesModule } from './article-categories/article-categories.module';

@Module({
  imports: [
    ArticleCategoriesModule,
    TicketTypesModule,
    StatisticsMetadataModule,
    UserPatientsModule,
    NotificationUsersModule,
    NotificationsModule,
    DaysOffsModule,
    AgendasModule,
    InjuriesModule,
    SymptomsModule,
    PathologiesModule,
    treatmentsModule,
    IllnessesModule,
    StatisticsModule,
    RatingsModule,
    PackagesModule,
    EmployeeProfilesModule,
    RoomsModule,
    InstructionsModule,
    DiagnosticsModule,
    MedicalCentersModule,
    RequestsModule,
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
    //EventsModule,
    SocketModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      scope: Scope.REQUEST,
      useClass: SystemGuard,
    },
  ],
})
export class AppModule {}
