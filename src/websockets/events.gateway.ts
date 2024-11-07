import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
    console.log('Number of connected customers ', server.clients.size);
  }

  handleConnection(client: WebSocket) {
    console.log('Client connected:', client.readyState);
  }
  handleDisconnect(client: WebSocket) {
    console.log('Client disconnected:', client.readyState);
  }

  broadcastMessage(message: string) {
    this.server.clients.forEach((client: WebSocket) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
  handleMessage(client: WebSocket, message: string): void {
    console.log('Received message:', message);
    client.send(`Echo: ${message}`);
  }
}
