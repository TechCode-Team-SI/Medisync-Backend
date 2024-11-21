import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class PrivateGuard implements CanActivate {
  constructor(private configService: ConfigService<AllConfigType>) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const receivedToken = request.headers?.token;
    const token = this.configService.getOrThrow('app.installToken', {
      infer: true,
    });
    return token === receivedToken;
  }
}
