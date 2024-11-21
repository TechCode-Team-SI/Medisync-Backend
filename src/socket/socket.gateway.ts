import { Injectable, UseFilters, UseGuards, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Me } from 'src/auth/auth.decorator';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';
import { JoinSocketRoomDto } from './dto/join-room.dto';
import { SendTicketMessageDto } from './dto/send-ticket-message.dto';
import { WsAuthGuard } from './socket-auth.guard';
import { SocketEnum } from './socket-enum';
import { WebsocketExceptionsFilter } from './socket-exception';
import { WsValidationPipe } from './socket-validation-pipe';
import { SocketService } from './socket.service';

@UseFilters(WebsocketExceptionsFilter)
@UsePipes(WsValidationPipe)
@UseGuards(WsAuthGuard)
@WebSocketGateway()
@Injectable()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) {}

  afterInit() {
    console.log('Websocket Working');
  }

  handleConnection() {
    console.log(`Clientes conectados: ${this.server.sockets.sockets.size}`);
  }

  handleDisconnect() {
    console.log(`Clientes conectados: ${this.server.sockets.sockets.size}`);
  }

  @SubscribeMessage(SocketEnum.JOIN_USER_ROOM)
  async handleJoinUserRoom(
    @ConnectedSocket() socket: Socket,
    @Me('ws') userPayload: JwtPayloadType,
  ) {
    await socket.join(userPayload.id);
  }

  @SubscribeMessage(SocketEnum.JOIN_ROOM)
  async handleJoinRoom(
    @MessageBody() body: JoinSocketRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`socket ${socket.id} Joining room ${body.roomId}`);
    await socket.join(body.roomId);
  }

  @SubscribeMessage(SocketEnum.LEAVE_ROOM)
  async handleLeaveRoom(
    @MessageBody() body: JoinSocketRoomDto,
    @ConnectedSocket() socket: Socket,
  ) {
    console.log(`socket ${socket.id} leaving room ${body.roomId}`);
    return socket.leave(body.roomId);
  }

  @SubscribeMessage(SocketEnum.SEND_MESSAGE)
  handleSendMessage(
    @MessageBody() data: { event: string; message: unknown },
    @ConnectedSocket() socket: Socket,
  ) {
    const { event, message } = data;
    console.log(event, message);

    this.socketService.sendMessageToUser(socket, event, message);
  }

  //COMPLAINTS AND SUGGESTIONS
  @SubscribeMessage(SocketEnum.TICKET_CHANNEL)
  handleTicketMessage(
    @MessageBody() data: SendTicketMessageDto,
    @ConnectedSocket() socket: Socket,
  ) {
    const { roomId, ...rest } = data;
    socket.to(roomId).emit(SocketEnum.TICKET_CHANNEL, rest);
  }
}
