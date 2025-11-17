import { IsOptional, IsEnum, IsInt, Min, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoomType } from '@prisma/client';
import { Type } from 'class-transformer';

export class QueryRoomsDto {
  @ApiPropertyOptional({ enum: RoomType })
  @IsEnum(RoomType)
  @IsOptional()
  type?: RoomType;

  @ApiPropertyOptional({ minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  minCapacity?: number;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  availableFrom?: string;

  @ApiPropertyOptional()
  @IsDateString()
  @IsOptional()
  availableTo?: string;
}
