import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsInt,
  Min,
  IsOptional,
  IsObject,
  IsArray,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Floor ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  floorId: string;

  @ApiProperty({
    description: 'Room number',
    example: '101',
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  roomNumber: string;

  @ApiProperty({
    description: 'Room type',
    enum: RoomType,
    example: RoomType.CLASSROOM,
  })
  @IsEnum(RoomType)
  type: RoomType;

  @ApiProperty({
    description: 'Room capacity',
    example: 45,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  capacity: number;

  @ApiPropertyOptional({
    description: 'Room coordinates for visualization',
    example: { x: 120, y: 200, width: 80, height: 60 },
  })
  @IsObject()
  @IsOptional()
  coordinates?: any;

  @ApiPropertyOptional({
    description: 'Available equipment in the room',
    example: ['Projector', 'Whiteboard', 'AC'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  equipment?: string[];
}
