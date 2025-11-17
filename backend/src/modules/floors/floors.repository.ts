import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Floor } from './entities/floor.entity';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { IRepository } from '@/common/interfaces/repository.interface';

@Injectable()
export class FloorsRepository implements IRepository<Floor> {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Floor[]> {
    const floors = await this.prisma.floor.findMany({
      orderBy: [{ buildingId: 'asc' }, { floorNumber: 'asc' }],
    });
    return floors.map((f) => new Floor(f));
  }

  async findById(id: string): Promise<Floor | null> {
    const floor = await this.prisma.floor.findUnique({
      where: { id },
    });
    return floor ? new Floor(floor) : null;
  }

  async findByBuildingId(buildingId: string): Promise<Floor[]> {
    const floors = await this.prisma.floor.findMany({
      where: { buildingId },
      orderBy: { floorNumber: 'asc' },
    });
    return floors.map((f) => new Floor(f));
  }

  async create(data: Partial<Floor>): Promise<Floor> {
    const floor = await this.prisma.floor.create({
      data: data as any,
    });
    return new Floor(floor);
  }

  async update(id: string, data: Partial<Floor>): Promise<Floor> {
    const floor = await this.prisma.floor.update({
      where: { id },
      data: data as any,
    });
    return new Floor(floor);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.floor.delete({
      where: { id },
    });
  }
}
