import { IsString, IsNotEmpty, IsDateString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ example: 'Introduction to Computer Science' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  className: string;

  @ApiProperty({ example: 'Dr. Ahmed Ali' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  bookedBy: string;

  @ApiProperty({ example: '2024-01-01T08:00:00Z' })
  @IsDateString()
  startTime: string;

  @ApiProperty({ example: '2024-01-01T10:00:00Z' })
  @IsDateString()
  endTime: string;
}
