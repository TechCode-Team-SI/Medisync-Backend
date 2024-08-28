import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InstallationStepEnum } from './installations.enum';
import { InstallationsService } from './installations.service';
import { exceptionResponses } from './installations.messages';

@Injectable()
export class InstallationsGuard implements CanActivate {
  constructor(
    private readonly installationsService: InstallationsService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const installationStep = await this.installationsService.findOne();
    if (!installationStep) return false;

    const isUnguarded = this.reflector.getAllAndOverride<boolean>(
      'isUnguarded',
      [context.getClass(), context.getHandler()],
    );
    if (isUnguarded) {
      if (installationStep.step === InstallationStepEnum.FINISHED) {
        throw new UnprocessableEntityException(
          exceptionResponses.InstallationAlreadyComplete,
        );
      }

      const currentInstalationStep =
        this.reflector.getAllAndOverride<InstallationStepEnum>(
          'currentInstallationStep',
          [context.getClass(), context.getHandler()],
        );

      if (!currentInstalationStep) return true;

      if (currentInstalationStep !== installationStep.step) {
        throw new UnprocessableEntityException({
          error: 'incorrect_step',
          message: `current step: ${installationStep.step}`,
        });
      }

      return true;
    }

    if (installationStep.step === InstallationStepEnum.FINISHED) return true;

    throw new ForbiddenException(exceptionResponses.SystemNotInstalled);
  }
}
