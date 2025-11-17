import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { Building } from './entities/building.entity';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { IRepository } from '@/common/interfaces/repository.interface';

@Injectable()
export class BuildingsRepository implements IRepository<Building> {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Building[]> {
    const buildings = await this.prisma.building.findMany({
      orderBy: { name: 'asc' },
    });
    return buildings.map((b) => new Building(b));
  }

  async findById(id: string): Promise<Building | null> {
    const building = await this.prisma.building.findUnique({
      where: { id },
    });
    return building ? new Building(building) : null;
  }

  async findByIdWithRelations(id: string): Promise<Building | null> {
    const building = await this.prisma.building.findUnique({
      where: { id },
      include: {
        floors: {
          include: {
            rooms: true,
          },
        },
      },
    });
    return building ? new Building(building) : null;
  }

  async create(data: CreateBuildingDto): Promise<Building> {
    const building = await this.prisma.building.create({
      data,
    });
    return new Building(building);
  }

  async update(id: string, data: UpdateBuildingDto): Promise<Building> {
    const building = await this.prisma.building.update({
      where: { id },
      data,
    });
    return new Building(building);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.building.delete({
      where: { id },
    });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.building.count({
      where: { id },
    });
    return count > 0;
  }
}
