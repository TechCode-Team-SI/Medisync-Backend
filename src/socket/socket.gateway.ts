import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) {}

  async handleConnection(socket: Socket) {
    console.log('Cliente conectado: ${ socket.id }');

    await this.socketService.addClient(socket);
  }

  handleDisconnect(socket: Socket) {
    console.log('Cliente desconectado: ${ socket.id }');

    this.socketService.removeClient(socket);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(
      'Solicitud para unirse a la sala ${ roomId } recibida de ${ socket.id }',
    );

    await this.socketService.addToRoom(socket, roomId);
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(
      'Solicitud para salir de la sala ${ roomId } recibida de ${ socket.id }',
    );

    await this.socketService.RemoveFromRoom(socket, roomId);
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: { event: string; message: unknown },
    @ConnectedSocket() socket: Socket,
  ) {
    const { event, message } = data;

    this.socketService.sendMessageToUser(socket, event, message);
  }
}
