import { IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QuerySchedulesDto {
  @ApiPropertyOptional({ example: '2024-01-01T00:00:00Z' })
  @IsDateString()
  @IsOptional()
  from?: string;

  @ApiPropertyOptional({ example: '2024-01-31T23:59:59Z' })
  @IsDateString()
  @IsOptional()
  to?: string;
}
