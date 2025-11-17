import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('RealtimeGateway');

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('subscribe:building')
  handleSubscribeBuilding(client: Socket, buildingId: string) {
    client.join(`building:${buildingId}`);
    this.logger.log(`Client ${client.id} subscribed to building ${buildingId}`);
  }

  @SubscribeMessage('subscribe:floor')
  handleSubscribeFloor(client: Socket, floorId: string) {
    client.join(`floor:${floorId}`);
    this.logger.log(`Client ${client.id} subscribed to floor ${floorId}`);
  }

  @SubscribeMessage('subscribe:room')
  handleSubscribeRoom(client: Socket, roomId: string) {
    client.join(`room:${roomId}`);
    this.logger.log(`Client ${client.id} subscribed to room ${roomId}`);
  }

  emitBuildingUpdate(buildingId: string, data: any) {
    this.server.to(`building:${buildingId}`).emit('building.updated', data);
  }

  emitFloorUpdate(floorId: string, data: any) {
    this.server.to(`floor:${floorId}`).emit('floor.updated', data);
  }

  emitRoomUpdate(roomId: string, data: any) {
    this.server.to(`room:${roomId}`).emit('room.updated', data);
  }

  emitScheduleUpdate(roomId: string, data: any) {
    this.server.to(`room:${roomId}`).emit('schedule.updated', data);
  }
}
