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
import { Socket } from 'dgram';
import { Server } from 'ws';
import { EventsService } from './events.service';
import { Injectable } from '@nestjs/common';

@WebSocketGateway()
@Injectable()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
    this.eventsService.setServer(server);
  }

  handleConnection() {
    console.log('New Connection! Active Clients:', this.server.clients.size);
  }

  handleDisconnect() {
    console.log(
      'Client Disconnected, Active Clients:',
      this.server.clients.size,
    );
  }

  @SubscribeMessage('connect-client')
  handleConnectClient(
    @MessageBody() data: Partial<{ id: string }>,
    @ConnectedSocket() client: Socket,
  ) {
    if (!data.id) return;
    return this.eventsService.addClient(data.id, client);
  }

  @SubscribeMessage('disconnect-client')
  handleDisconnectClient(@MessageBody() data: Partial<{ id: string }>) {
    if (!data.id) return;
    this.eventsService.removeclient(data.id);
  }

  @SubscribeMessage('user')
  handleUser(@MessageBody() data: any): Promise<string> {
    console.log(data);
    return Promise.resolve('Hello world!');
  }
}
