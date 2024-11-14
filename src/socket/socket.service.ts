import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SocketService {
  private server: Server;
  constructor(private readonly useService: UsersService) {}

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    return this.server;
  }

  async addClient(socket: Socket) {
    const userId = socket.handshake.query.userID as string;
    const ClientUser = await this.useService.findById(userId);

    if (!ClientUser) {
      console.log('Usuario con ID ${userID} no encontrado ');
      socket.disconnect();
      return;
    } else {
      socket.data.userId = ClientUser.id;
      console.log('Usuario ${ClientUser.id} conectado al socket ${socket.id} ');
    }
  }

  removeClient(socket: Socket) {
    console.log('Usuario' + socket.data.userId + ' desconectado');
  }

  async addToRoom(socket: Socket, roomId: string) {
    const userId = socket.data.userId;
    if (!userId) {
      console.log('Usuario no conectado');
      return;
    } else {
      try {
        await socket.join(roomId);
        console.log('Usuario ${userId} agregado a la sala ${roomId}');
      } catch (error) {
        console.error(
          'Error al agregar usuario ${userId} a la sala ${roomId}',
          error,
        );
      }
    }
  }

  async RemoveFromRoom(socket: Socket, roomId: string) {
    const userId = socket.data.userId;
    if (!userId) {
      console.log('Usuario no conectado');
      return;
    } else {
      try {
        await socket.leave(roomId);
        console.log('Usuario ${userId} eliminado de la sala ${roomId}');
      } catch (error) {
        console.error(
          'Error al eliminar al usuario ${userId} de la sala ${roomId}',
          error,
        );
      }
    }
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
