import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { QueryRoomsDto } from './dto/query-rooms.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomsService {
  constructor(private readonly repository: RoomsRepository) {}

  async findAll(): Promise<Room[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Room> {
    const room = await this.repository.findById(id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    return room;
  }

  async findByFloorId(floorId: string): Promise<Room[]> {
    return this.repository.findByFloorId(floorId);
  }

  async findWithFilters(query: QueryRoomsDto): Promise<Room[]> {
    return this.repository.findWithFilters(query);
  }

  async create(dto: CreateRoomDto): Promise<Room> {
    try {
      return await this.repository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Room ${dto.roomNumber} already exists on this floor`,
        );
      }
      if (error.code === 'P2003') {
        throw new NotFoundException(`Floor with ID ${dto.floorId} not found`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateRoomDto): Promise<Room> {
    await this.findById(id);
    try {
      return await this.repository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `Room ${dto.roomNumber} already exists on this floor`,
        );
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
