import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Room } from './entities/room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { QueryRoomsDto } from './dto/query-rooms.dto';
import { IRepository } from '@/common/interfaces/repository.interface';

@Injectable()
export class RoomsRepository implements IRepository<Room> {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany({
      orderBy: { roomNumber: 'asc' },
    });
    return rooms.map((r) => new Room(r));
  }

  async findById(id: string): Promise<Room | null> {
    const room = await this.prisma.room.findUnique({
      where: { id },
    });
    return room ? new Room(room) : null;
  }

  async findByFloorId(floorId: string): Promise<Room[]> {
    const rooms = await this.prisma.room.findMany({
      where: { floorId },
      orderBy: { roomNumber: 'asc' },
    });
    return rooms.map((r) => new Room(r));
  }

  async findWithFilters(query: QueryRoomsDto): Promise<Room[]> {
    const where: any = {};

    if (query.type) {
      where.type = query.type;
    }

    if (query.minCapacity) {
      where.capacity = { gte: query.minCapacity };
    }

    // For availability, we need to check schedules
    if (query.availableFrom && query.availableTo) {
      where.schedules = {
        none: {
          AND: [
            { startTime: { lte: new Date(query.availableTo) } },
            { endTime: { gte: new Date(query.availableFrom) } },
          ],
        },
      };
    }

    const rooms = await this.prisma.room.findMany({
      where,
      orderBy: { roomNumber: 'asc' },
    });

    return rooms.map((r) => new Room(r));
  }

  async create(data: CreateRoomDto): Promise<Room> {
    const room = await this.prisma.room.create({
      data,
    });
    return new Room(room);
  }

  async update(id: string, data: UpdateRoomDto): Promise<Room> {
    const room = await this.prisma.room.update({
      where: { id },
      data,
    });
    return new Room(room);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.room.delete({
      where: { id },
    });
  }
}
