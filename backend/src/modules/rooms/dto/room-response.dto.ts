import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';
import { Room } from '../entities/room.entity';

export class RoomResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  floorId: string;

  @ApiProperty()
  roomNumber: string;

  @ApiProperty({ enum: RoomType })
  type: RoomType;

  @ApiProperty()
  capacity: number;

  @ApiProperty()
  coordinates: any;

  @ApiProperty()
  equipment: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(room: Room) {
    this.id = room.id;
    this.floorId = room.floorId;
    this.roomNumber = room.roomNumber;
    this.type = room.type;
    this.capacity = room.capacity;
    this.coordinates = room.coordinates;
    this.equipment = room.equipment;
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt;
  }
}
