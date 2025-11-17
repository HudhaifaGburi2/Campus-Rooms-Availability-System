import { Building as PrismaBuilding } from '@prisma/client';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';

export class Building implements BaseEntity {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: PrismaBuilding) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
