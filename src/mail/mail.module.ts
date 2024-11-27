import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MedicalCentersModule } from 'src/medical-centers/medical-centers.module';
import { MailerModule } from '../mailer/mailer.module';
import { MailConsumer } from './mail.consumer';
import { MailService } from './mail.service';

@Module({
  imports: [ConfigModule, MailerModule, MedicalCentersModule],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule {}
