import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WsException } from '@nestjs/websockets';

export class WsAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const data = context.switchToWs().getClient().handshake;
    console.log(data);
    return data;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new WsException('Unauthorized');
    }
    console.log(user);
    return user;
  }
}
