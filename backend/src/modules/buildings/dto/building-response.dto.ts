import { ApiProperty } from '@nestjs/swagger';
import { Building } from '../entities/building.entity';

export class BuildingResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'Engineering Block' })
  name: string;

  @ApiProperty({ example: 'Main engineering building' })
  description: string | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;

  constructor(building: Building) {
    this.id = building.id;
    this.name = building.name;
    this.description = building.description;
    this.createdAt = building.createdAt;
    this.updatedAt = building.updatedAt;
  }
}
