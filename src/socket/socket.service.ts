import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@Injectable()
export class SocketService {
  private server: Server;
  constructor() {}

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    return this.server;
  }

  async addToRoom(socket: Socket, roomId: string) {
    return socket.join(roomId);
  }

  async RemoveFromRoom(socket: Socket, roomId: string) {
    return socket.leave(roomId);
  }

  broadcastMessage(event: string, payload: unknown) {
    if (!this.server) return;
    this.server.emit(event, payload);
  }

  sendMessageToUser(socket: Socket, event: string, payload: unknown) {
    if (socket && socket.connected) {
      socket.emit(event, payload);
      console.log('Mensaje enviado a ${socket.data.userId}');
    } else {
      console.log(
        'Usuario ${socket.data.userId} no esta conectado o socket cerrado ',
      );
    }
  }
}
