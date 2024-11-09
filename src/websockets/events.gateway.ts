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
    console.log('Number of connected customers on init', server.clients.size);
  }

  handleConnection(client: WebSocket) {
    console.log('Client state:', client.readyState);
    console.log('Client connected:', this.server.clients.size);
  }
  handleDisconnect(client: WebSocket) {
    console.log('Client state:', client.readyState);
    console.log('Client disconnected:', this.server.clients.size);
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
