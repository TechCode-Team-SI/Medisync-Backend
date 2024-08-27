import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailData } from './interfaces/mail-data.interface';

import { MaybeType } from '../utils/types/maybe.type';
import { MailerService } from '../mailer/mailer.service';
import path from 'path';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async forgotPassword(mailData: MailData<{ code: string }>): Promise<void> {
    const resetPasswordTitle: MaybeType<string> = 'Reset Password';
    const text1: MaybeType<string> = 'Has solicitado cambiar la contrasena.';
    const text2: MaybeType<string> = `Por favor usa el siguiente codigo para resetear la contrasena:`;
    let text3: MaybeType<string>;
    const footerText1: MaybeType<string> =
      'Si no has solicitado este correo, por favor ignóralo.';

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/password-change',
    );

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: resetPasswordTitle,
      text: `${url.toString()} ${resetPasswordTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'code.hbs',
      ),
      context: {
        title: resetPasswordTitle,
        code: mailData.data.code,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
        footerText1,
      },
    });
  }

  async confirmEmail(
    mailData: MailData<{ code: string; fullName: string }>,
  ): Promise<void> {
    const emailConfirmTitle: MaybeType<string> =
      'Confirmación de correo electrónico';
    const text1: MaybeType<string> = `Hola, ${mailData.data.fullName}`;
    const text2: MaybeType<string> =
      '¡Gracias por registrarte con nosotros! Para completar tu registro, por favor confirma tu dirección de correo electrónico con este codigo a continuacion';
    let text3: MaybeType<string>;
    const footerText1: MaybeType<string> =
      'Si no has solicitado este correo, por favor ignóralo.';

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: emailConfirmTitle,
      text: `${mailData.data.code} ${emailConfirmTitle}`,
      templatePath: path.join(
        this.configService.getOrThrow('app.workingDirectory', {
          infer: true,
        }),
        'src',
        'mail',
        'mail-templates',
        'code.hbs',
      ),
      context: {
        title: emailConfirmTitle,
        code: mailData.data.code,
        app_name: this.configService.get('app.name', { infer: true }),
        text1,
        text2,
        text3,
        footerText1,
      },
    });
  }
}
