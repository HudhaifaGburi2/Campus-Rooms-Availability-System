import { IsString, IsNotEmpty, IsInt, IsOptional, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFloorDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsNotEmpty()
  buildingId: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  floorNumber: number;

  @ApiPropertyOptional({ example: { svg: '...', zones: [] } })
  @IsObject()
  @IsOptional()
  mapData?: any;
}
