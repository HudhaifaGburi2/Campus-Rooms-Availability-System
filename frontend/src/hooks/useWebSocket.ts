'use client'

import { useEffect, useRef, useCallback } from 'react'
import { websocketService } from '@/services/websocket.service'

export function useWebSocket() {
  const isConnected = useRef(false)

  useEffect(() => {
    if (!isConnected.current) {
      websocketService.connect()
      isConnected.current = true
    }

    return () => {
      websocketService.disconnect()
      isConnected.current = false
    }
  }, [])

  const subscribeToBuilding = useCallback((buildingId: string) => {
    websocketService.subscribeToBuilding(buildingId)
  }, [])

  const subscribeToFloor = useCallback((floorId: string) => {
    websocketService.subscribeToFloor(floorId)
  }, [])

  const subscribeToRoom = useCallback((roomId: string) => {
    websocketService.subscribeToRoom(roomId)
  }, [])

  const onBuildingUpdate = useCallback((callback: (data: any) => void) => {
    websocketService.onBuildingUpdate(callback)
    return () => websocketService.off('building.updated', callback)
  }, [])

  const onFloorUpdate = useCallback((callback: (data: any) => void) => {
    websocketService.onFloorUpdate(callback)
    return () => websocketService.off('floor.updated', callback)
  }, [])

  const onRoomUpdate = useCallback((callback: (data: any) => void) => {
    websocketService.onRoomUpdate(callback)
    return () => websocketService.off('room.updated', callback)
  }, [])

  const onScheduleUpdate = useCallback((callback: (data: any) => void) => {
    websocketService.onScheduleUpdate(callback)
    return () => websocketService.off('schedule.updated', callback)
  }, [])

  return {
    subscribeToBuilding,
    subscribeToFloor,
    subscribeToRoom,
    onBuildingUpdate,
    onFloorUpdate,
    onRoomUpdate,
    onScheduleUpdate,
  }
}
