export interface IBuilding {
  id: string
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface IBuildingWithFloors extends IBuilding {
  floors: IFloor[]
}

export interface IFloor {
  id: string
  buildingId: string
  floorNumber: number
  mapData?: any
  createdAt: Date
  updatedAt: Date
}
