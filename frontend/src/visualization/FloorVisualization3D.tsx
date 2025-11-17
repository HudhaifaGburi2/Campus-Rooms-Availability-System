'use client'

import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Box, Text } from '@react-three/drei'
import * as THREE from 'three'

interface Room {
  id: string
  position: [number, number, number]
  size: [number, number, number]
  status: 'available' | 'occupied' | 'maintenance'
  label: string
}

export function FloorVisualization3D() {
  const [rooms] = useState<Room[]>([
    { id: '1', position: [-4, 0.5, -4], size: [2, 1, 2], status: 'available', label: 'A-101' },
    { id: '2', position: [0, 0.5, -4], size: [2, 1, 2], status: 'occupied', label: 'A-102' },
    { id: '3', position: [4, 0.5, -4], size: [2, 1, 2], status: 'available', label: 'A-103' },
    { id: '4', position: [-4, 0.5, 0], size: [2, 1, 2], status: 'maintenance', label: 'A-104' },
    { id: '5', position: [0, 0.5, 0], size: [2, 1, 2], status: 'available', label: 'A-105' },
    { id: '6', position: [4, 0.5, 0], size: [2, 1, 2], status: 'occupied', label: 'A-106' },
  ])

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden" style={{ height: '600px' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
        <OrbitControls enableDamping dampingFactor={0.05} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>

        {/* Grid */}
        <gridHelper args={[20, 20, '#475569', '#334155']} position={[0, 0.01, 0]} />

        {/* Rooms */}
        {rooms.map((room) => (
          <RoomBox key={room.id} room={room} />
        ))}

        {/* Legend */}
        <group position={[-8, 0.5, 8]}>
          <Text position={[0, 1.5, 0]} fontSize={0.3} color="white">
            Legend
          </Text>
          <LegendItem position={[0, 1, 0]} color="#22c55e" label="Available" />
          <LegendItem position={[0, 0.5, 0]} color="#ef4444" label="Occupied" />
          <LegendItem position={[0, 0, 0]} color="#f59e0b" label="Maintenance" />
        </group>
      </Canvas>

      {/* Controls Info */}
      <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white px-4 py-3 rounded-lg text-sm">
        <p className="font-semibold mb-2">Controls:</p>
        <p>• Left Click + Drag: Rotate</p>
        <p>• Right Click + Drag: Pan</p>
        <p>• Scroll: Zoom</p>
      </div>
    </div>
  )
}

function RoomBox({ room }: { room: Room }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current && hovered) {
      meshRef.current.position.y = room.position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    } else if (meshRef.current) {
      meshRef.current.position.y = room.position[1]
    }
  })

  const getColor = () => {
    switch (room.status) {
      case 'available':
        return '#22c55e'
      case 'occupied':
        return '#ef4444'
      case 'maintenance':
        return '#f59e0b'
      default:
        return '#64748b'
    }
  }

  return (
    <group position={room.position}>
      <mesh
        ref={meshRef}
        castShadow
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={room.size} />
        <meshStandardMaterial
          color={getColor()}
          emissive={hovered ? getColor() : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>
      <Text
        position={[0, room.size[1] + 0.3, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {room.label}
      </Text>
    </group>
  )
}

function LegendItem({
  position,
  color,
  label,
}: {
  position: [number, number, number]
  color: string
  label: string
}) {
  return (
    <group position={position}>
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <Text position={[0.3, 0, 0]} fontSize={0.2} color="white" anchorX="left">
        {label}
      </Text>
    </group>
  )
}
