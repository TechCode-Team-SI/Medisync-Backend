import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailerModule } from '../mailer/mailer.module';
import { MedicalCentersModule } from 'src/medical-centers/medical-centers.module';

@Module({
  imports: [ConfigModule, MailerModule, MedicalCentersModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
