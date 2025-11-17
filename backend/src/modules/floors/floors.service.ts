import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { FloorsRepository } from './floors.repository';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { Floor } from './entities/floor.entity';

@Injectable()
export class FloorsService {
  constructor(private readonly repository: FloorsRepository) {}

  async findAll(): Promise<Floor[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Floor> {
    const floor = await this.repository.findById(id);
    if (!floor) {
      throw new NotFoundException(`Floor with ID ${id} not found`);
    }
    return floor;
  }

  async findByBuildingId(buildingId: string): Promise<Floor[]> {
    return this.repository.findByBuildingId(buildingId);
  }

  async create(dto: CreateFloorDto): Promise<Floor> {
    try {
      return await this.repository.create(dto as any);
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new NotFoundException(`Building with ID ${dto.buildingId} not found`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateFloorDto): Promise<Floor> {
    await this.findById(id);
    return this.repository.update(id, dto as any);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
