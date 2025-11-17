import { ApiProperty } from '@nestjs/swagger';
import { Floor } from '../entities/floor.entity';

export class FloorResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  buildingId: string;

  @ApiProperty()
  floorNumber: number;

  @ApiProperty({ required: false })
  mapData?: any;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(floor: Floor) {
    this.id = floor.id;
    this.buildingId = floor.buildingId;
    this.floorNumber = floor.floorNumber;
    this.mapData = floor.mapData;
    this.createdAt = floor.createdAt;
    this.updatedAt = floor.updatedAt;
  }
}
