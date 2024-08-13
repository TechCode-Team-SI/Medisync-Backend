import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InstallationStepEnum } from './installations.enum';
import { InstallationsService } from './installations.service';

@Injectable()
export class InstallationsGuard implements CanActivate {
  constructor(
    private readonly installationsService: InstallationsService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const installationStep = await this.installationsService.findOne();
    if (!installationStep) return false;

    const isInstallationEndpoint = this.reflector.getAllAndOverride<boolean>(
      'isInstallationEndpoint',
      [context.getClass(), context.getHandler()],
    );
    if (isInstallationEndpoint) return true;

    if (installationStep.step === InstallationStepEnum.FINISHED) return true;

    return false;
  }
}
