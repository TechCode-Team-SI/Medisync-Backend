import { Catch, ArgumentsHost } from '@nestjs/common';
import { WsException, BaseWsExceptionFilter } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WebsocketExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const client = ctx.getClient() as Socket;
    client.emit(
      'error',
      JSON.stringify({
        event: 'error',
        ok: false,
        error: exception.getError(),
      }),
    );
  }
}
