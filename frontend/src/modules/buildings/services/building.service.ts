import { apiService } from '@/services/api.service'
import { IBuilding, IBuildingWithFloors } from '@/interfaces/building.interface'

class BuildingService {
  private readonly basePath = '/buildings'

  async getAll(): Promise<IBuilding[]> {
    return apiService.get<IBuilding[]>(this.basePath)
  }

  async getById(id: string): Promise<IBuildingWithFloors> {
    return apiService.get<IBuildingWithFloors>(`${this.basePath}/${id}`)
  }

  async create(data: Omit<IBuilding, 'id' | 'createdAt' | 'updatedAt'>): Promise<IBuilding> {
    return apiService.post<IBuilding>(this.basePath, data)
  }

  async update(id: string, data: Partial<IBuilding>): Promise<IBuilding> {
    return apiService.put<IBuilding>(`${this.basePath}/${id}`, data)
  }

  async delete(id: string): Promise<void> {
    return apiService.delete<void>(`${this.basePath}/${id}`)
  }
}

export const buildingService = new BuildingService()
