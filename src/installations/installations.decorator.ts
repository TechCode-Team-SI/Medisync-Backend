import { SetMetadata } from '@nestjs/common';

export const IsInstallationEndpoint = () =>
  SetMetadata('isInstallationEndpoint', true);
