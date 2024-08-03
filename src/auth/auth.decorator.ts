import { createParamDecorator } from '@nestjs/common';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';

export const Me = createParamDecorator((data, req) => {
  return req.user as JwtPayloadType;
});
