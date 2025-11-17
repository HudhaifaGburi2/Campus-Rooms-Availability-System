'use client'

import { io, Socket } from 'socket.io-client'

class WebSocketService {
  private socket: Socket | null = null
  private url: string

  constructor() {
    this.url = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001'
  }

  connect(): void {
    if (this.socket?.connected) return

    this.socket = io(this.url, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    })

    this.socket.on('connect', () => {
      console.log('WebSocket connected')
    })

    this.socket.on('disconnect', () => {
      console.log('WebSocket disconnected')
    })

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error)
    })
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  subscribeToBuilding(buildingId: string): void {
    this.socket?.emit('subscribe:building', buildingId)
  }

  subscribeToFloor(floorId: string): void {
    this.socket?.emit('subscribe:floor', floorId)
  }

  subscribeToRoom(roomId: string): void {
    this.socket?.emit('subscribe:room', roomId)
  }

  onBuildingUpdate(callback: (data: any) => void): void {
    this.socket?.on('building.updated', callback)
  }

  onFloorUpdate(callback: (data: any) => void): void {
    this.socket?.on('floor.updated', callback)
  }

  onRoomUpdate(callback: (data: any) => void): void {
    this.socket?.on('room.updated', callback)
  }

  onScheduleUpdate(callback: (data: any) => void): void {
    this.socket?.on('schedule.updated', callback)
  }

  off(event: string, callback?: (...args: any[]) => void): void {
    if (callback) {
      this.socket?.off(event, callback)
    } else {
      this.socket?.off(event)
    }
  }
}

export const websocketService = new WebSocketService()
