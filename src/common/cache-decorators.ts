import { SetMetadata } from '@nestjs/common';

export const HttpCachePath = (key?: string) => SetMetadata('HTTP_PATH', key);
