export enum RoomType {
  CLASSROOM = 'CLASSROOM',
  LAB = 'LAB',
  OFFICE = 'OFFICE',
  AUDITORIUM = 'AUDITORIUM',
  LIBRARY = 'LIBRARY',
  CAFETERIA = 'CAFETERIA',
  GYM = 'GYM',
  OTHER = 'OTHER',
}

export interface IRoom {
  id: string
  floorId: string
  roomNumber: string
  type: RoomType
  capacity: number
  coordinates?: {
    x: number
    y: number
  }
  equipment: string[]
  createdAt: Date
  updatedAt: Date
}

export interface IRoomWithSchedules extends IRoom {
  schedules: ISchedule[]
}

export interface ISchedule {
  id: string
  roomId: string
  className: string
  bookedBy: string
  startTime: Date
  endTime: Date
  createdAt: Date
  updatedAt: Date
}
