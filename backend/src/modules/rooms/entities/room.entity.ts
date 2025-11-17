import { Room as PrismaRoom, RoomType } from '@prisma/client';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';

export class Room implements BaseEntity {
  id: string;
  floorId: string;
  roomNumber: string;
  type: RoomType;
  capacity: number;
  coordinates: any;
  equipment: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PrismaRoom) {
    this.id = data.id;
    this.floorId = data.floorId;
    this.roomNumber = data.roomNumber;
    this.type = data.type;
    this.capacity = data.capacity;
    this.coordinates = data.coordinates;
    this.equipment = data.equipment;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
