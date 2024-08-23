import { SetMetadata } from '@nestjs/common';
import { InstallationStepEnum } from './installations.enum';

export const IsInstallationEndpoint = () =>
  SetMetadata('isInstallationEndpoint', true);

export const CurrentInstallationStep = (
  instalationStep: InstallationStepEnum,
) => SetMetadata('currentInstallationStep', instalationStep);
