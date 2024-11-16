import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

export class WsAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    return context.switchToWs().getClient().handshake;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new WsException('Unauthorized');
    }
    console.log(user);
    return user;
  }
}
