import { SetMetadata } from '@nestjs/common';
import { InstallationStepEnum } from './installations.enum';

export const IsUnguarded = () => SetMetadata('isUnguarded', true);

export const CurrentInstallationStep = (
  instalationStep: InstallationStepEnum,
) => SetMetadata('currentInstallationStep', instalationStep);
