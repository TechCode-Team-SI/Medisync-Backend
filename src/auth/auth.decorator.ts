import { createParamDecorator } from '@nestjs/common';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';

export const Me = createParamDecorator((_, context) => {
  const req = context.switchToHttp().getRequest();
  return req.user as JwtPayloadType;
});
