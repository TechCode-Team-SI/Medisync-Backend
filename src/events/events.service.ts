import { Injectable } from '@nestjs/common';
import { Server } from 'ws';
import { Socket } from 'dgram';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EventsService {
  private server: Server;
  private clients: Map<string, Socket> = new Map();
  private rooms: Map<string, string[]> = new Map();

  constructor(private readonly usersService: UsersService) {}

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    return this.server;
  }

  getClient(id: string): Socket | null {
    return this.clients.get(id) || null;
  }

  async addClient(id: string, client: Socket) {
    const clientUser = await this.usersService.findById(id);
    if (!clientUser) return;
    this.clients.set(clientUser.id, client);
  }

  removeclient(id: string) {
    this.clients.delete(id);
  }

  addToRoom(id: string, roomId: string) {
    const room = this.rooms.get(roomId) || [];
    room.push(id);
    this.rooms.set(roomId, room);
  }

  removeFromRoom(id: string, roomId: string) {
    const room = this.rooms.get(roomId) || [];
    const newRoom = room.filter((clientId) => clientId !== id);
    this.rooms.set(roomId, newRoom);
  }

  response(event: string, data: unknown) {
    return {
      event,
      data,
    };
  }

  broadcastMessage(event: string, payload: unknown) {
    if (!this.server) return;
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(this.response(event, payload)));
      }
    });
  }
}
