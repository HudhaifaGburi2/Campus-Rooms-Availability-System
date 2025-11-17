import { ApiProperty } from '@nestjs/swagger';
import { Schedule } from '../entities/schedule.entity';

export class ScheduleResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  roomId: string;

  @ApiProperty()
  className: string;

  @ApiProperty()
  bookedBy: string;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(schedule: Schedule) {
    this.id = schedule.id;
    this.roomId = schedule.roomId;
    this.className = schedule.className;
    this.bookedBy = schedule.bookedBy;
    this.startTime = schedule.startTime;
    this.endTime = schedule.endTime;
    this.createdAt = schedule.createdAt;
    this.updatedAt = schedule.updatedAt;
  }
}
