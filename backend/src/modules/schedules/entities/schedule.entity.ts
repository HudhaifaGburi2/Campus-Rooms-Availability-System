import { Schedule as PrismaSchedule } from '@prisma/client';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';

export class Schedule implements BaseEntity {
  id: string;
  roomId: string;
  className: string;
  bookedBy: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PrismaSchedule) {
    this.id = data.id;
    this.roomId = data.roomId;
    this.className = data.className;
    this.bookedBy = data.bookedBy;
    this.startTime = data.startTime;
    this.endTime = data.endTime;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
