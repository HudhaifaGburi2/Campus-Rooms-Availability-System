import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { BuildingsRepository } from './buildings.repository';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';

@Injectable()
export class BuildingsService {
  constructor(private readonly repository: BuildingsRepository) {}

  async findAll(): Promise<Building[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<Building> {
    const building = await this.repository.findById(id);
    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }
    return building;
  }

  async findByIdWithRelations(id: string): Promise<Building> {
    const building = await this.repository.findByIdWithRelations(id);
    if (!building) {
      throw new NotFoundException(`Building with ID ${id} not found`);
    }
    return building;
  }

  async create(dto: CreateBuildingDto): Promise<Building> {
    try {
      return await this.repository.create(dto);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Building with name "${dto.name}" already exists`);
      }
      throw error;
    }
  }

  async update(id: string, dto: UpdateBuildingDto): Promise<Building> {
    await this.findById(id); // Verify exists
    try {
      return await this.repository.update(id, dto);
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException(`Building with name "${dto.name}" already exists`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // Verify exists
    await this.repository.delete(id);
  }
}
