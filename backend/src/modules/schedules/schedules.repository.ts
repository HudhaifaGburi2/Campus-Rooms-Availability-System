import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Schedule } from './entities/schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { QuerySchedulesDto } from './dto/query-schedules.dto';

@Injectable()
export class SchedulesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Schedule[]> {
    const schedules = await this.prisma.schedule.findMany({
      orderBy: { startTime: 'asc' },
    });
    return schedules.map((s) => new Schedule(s));
  }

  async findById(id: string): Promise<Schedule | null> {
    const schedule = await this.prisma.schedule.findUnique({
      where: { id },
    });
    return schedule ? new Schedule(schedule) : null;
  }

  async findByRoomId(roomId: string, query?: QuerySchedulesDto): Promise<Schedule[]> {
    const where: any = { roomId };

    if (query?.from || query?.to) {
      where.AND = [];
      if (query.from) {
        where.AND.push({ startTime: { gte: new Date(query.from) } });
      }
      if (query.to) {
        where.AND.push({ endTime: { lte: new Date(query.to) } });
      }
    }

    const schedules = await this.prisma.schedule.findMany({
      where,
      orderBy: { startTime: 'asc' },
    });

    return schedules.map((s) => new Schedule(s));
  }

  async hasConflict(
    roomId: string,
    startTime: Date,
    endTime: Date,
    excludeId?: string,
  ): Promise<boolean> {
    const where: any = {
      roomId,
      AND: [
        { startTime: { lt: endTime } },
        { endTime: { gt: startTime } },
      ],
    };

    if (excludeId) {
      where.NOT = { id: excludeId };
    }

    const count = await this.prisma.schedule.count({ where });
    return count > 0;
  }

  async create(data: CreateScheduleDto): Promise<Schedule> {
    const schedule = await this.prisma.schedule.create({
      data: {
        ...data,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      },
    });
    return new Schedule(schedule);
  }

  async update(id: string, data: UpdateScheduleDto): Promise<Schedule> {
    const updateData: any = { ...data };
    if (data.startTime) {
      updateData.startTime = new Date(data.startTime);
    }
    if (data.endTime) {
      updateData.endTime = new Date(data.endTime);
    }

    const schedule = await this.prisma.schedule.update({
      where: { id },
      data: updateData,
    });
    return new Schedule(schedule);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.schedule.delete({
      where: { id },
    });
  }
}
