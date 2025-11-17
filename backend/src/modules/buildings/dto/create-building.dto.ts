import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBuildingDto {
  @ApiProperty({
    description: 'Building name',
    example: 'Engineering Block',
    maxLength: 255,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    description: 'Building description',
    example: 'Main engineering building with classrooms and labs',
  })
  @IsString()
  @IsOptional()
  description?: string;
}
