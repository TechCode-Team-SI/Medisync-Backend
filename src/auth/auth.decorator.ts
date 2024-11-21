import { createParamDecorator } from '@nestjs/common';
import { JwtPayloadType } from './strategies/types/jwt-payload.type';

export const Me = createParamDecorator(
  (type: 'http' | 'ws' = 'http', context) => {
    switch (type) {
      case 'ws':
        return context.switchToWs().getClient().handshake
          .user as JwtPayloadType;
      default:
        return context.switchToHttp().getRequest().user as JwtPayloadType;
    }
  },
);
