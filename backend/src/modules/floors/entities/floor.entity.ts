import { Floor as PrismaFloor } from '@prisma/client';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';

export class Floor implements BaseEntity {
  id: string;
  buildingId: string;
  floorNumber: number;
  mapData?: any;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PrismaFloor) {
    this.id = data.id;
    this.buildingId = data.buildingId;
    this.floorNumber = data.floorNumber;
    this.mapData = data.mapData;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
