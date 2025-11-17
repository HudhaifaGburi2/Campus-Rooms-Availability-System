import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { SchedulesRepository } from './schedules.repository';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { QuerySchedulesDto } from './dto/query-schedules.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(private readonly repository: SchedulesRepository) {}

  async findAll(): Promise<Schedule[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Schedule> {
    const schedule = await this.repository.findById(id);
    if (!schedule) {
      throw new NotFoundException(`Schedule with ID ${id} not found`);
    }
    return schedule;
  }

  async findByRoomId(roomId: string, query?: QuerySchedulesDto): Promise<Schedule[]> {
    return this.repository.findByRoomId(roomId, query);
  }

  async create(dto: CreateScheduleDto): Promise<Schedule> {
    // Check for conflicts
    const hasConflict = await this.repository.hasConflict(
      dto.roomId,
      new Date(dto.startTime),
      new Date(dto.endTime),
    );

    if (hasConflict) {
      throw new ConflictException(
        'This room is already booked during the specified time period',
      );
    }

    try {
      return await this.repository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new NotFoundException(`Room with ID ${dto.roomId} not found`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateScheduleDto): Promise<Schedule> {
    const existing = await this.findById(id);

    // Check for conflicts if time or room changed
    if (dto.startTime || dto.endTime || dto.roomId) {
      const hasConflict = await this.repository.hasConflict(
        dto.roomId || existing.roomId,
        new Date(dto.startTime || existing.startTime),
        new Date(dto.endTime || existing.endTime),
        id, // Exclude current schedule
      );

      if (hasConflict) {
        throw new ConflictException(
          'This room is already booked during the specified time period',
        );
      }
    }

    return this.repository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
