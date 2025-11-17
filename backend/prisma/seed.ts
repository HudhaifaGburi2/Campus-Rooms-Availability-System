import { PrismaClient, RoomType, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ccfvs.edu' },
    update: {},
    create: {
      email: 'admin@ccfvs.edu',
      password: hashedPassword,
      name: 'System Administrator',
      role: UserRole.ADMIN,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Create buildings
  const engineeringBuilding = await prisma.building.upsert({
    where: { name: 'Engineering Block' },
    update: {},
    create: {
      name: 'Engineering Block',
      description: 'Main engineering building with classrooms and labs',
    },
  });

  const scienceBuilding = await prisma.building.upsert({
    where: { name: 'Science Complex' },
    update: {},
    create: {
      name: 'Science Complex',
      description: 'Science laboratories and research facilities',
    },
  });

  console.log('✅ Created buildings');

  // Create floors for Engineering Building
  const engFloor1 = await prisma.floor.create({
    data: {
      buildingId: engineeringBuilding.id,
      floorNumber: 1,
      mapData: { width: 400, height: 300 },
    },
  });

  const engFloor2 = await prisma.floor.create({
    data: {
      buildingId: engineeringBuilding.id,
      floorNumber: 2,
      mapData: { width: 400, height: 300 },
    },
  });

  // Create floors for Science Building
  const sciFloor1 = await prisma.floor.create({
    data: {
      buildingId: scienceBuilding.id,
      floorNumber: 1,
      mapData: { width: 350, height: 280 },
    },
  });

  console.log('✅ Created floors');

  // Create rooms for Engineering Building - Floor 1
  const rooms = await prisma.room.createMany({
    data: [
      {
        floorId: engFloor1.id,
        roomNumber: '101',
        type: RoomType.CLASSROOM,
        capacity: 45,
        coordinates: { x: 120, y: 200, width: 80, height: 60 },
        equipment: ['Projector', 'Whiteboard', 'AC'],
      },
      {
        floorId: engFloor1.id,
        roomNumber: '102',
        type: RoomType.CONFERENCE,
        capacity: 20,
        coordinates: { x: 230, y: 100, width: 60, height: 50 },
        equipment: ['Video Conference', 'Whiteboard'],
      },
      {
        floorId: engFloor1.id,
        roomNumber: '103',
        type: RoomType.LAB,
        capacity: 30,
        coordinates: { x: 50, y: 80, width: 90, height: 70 },
        equipment: ['Computer Stations', 'Network Lab Equipment'],
      },
      // Engineering Building - Floor 2
      {
        floorId: engFloor2.id,
        roomNumber: '201',
        type: RoomType.CLASSROOM,
        capacity: 50,
        coordinates: { x: 100, y: 180, width: 90, height: 70 },
        equipment: ['Projector', 'Whiteboard', 'AC', 'Sound System'],
      },
      {
        floorId: engFloor2.id,
        roomNumber: '202',
        type: RoomType.LAB,
        capacity: 25,
        coordinates: { x: 240, y: 120, width: 80, height: 60 },
        equipment: ['Electronic Lab Equipment', 'Oscilloscopes'],
      },
      // Science Building - Floor 1
      {
        floorId: sciFloor1.id,
        roomNumber: 'S101',
        type: RoomType.LAB,
        capacity: 30,
        coordinates: { x: 80, y: 150, width: 85, height: 65 },
        equipment: ['Chemistry Lab Equipment', 'Fume Hoods'],
      },
      {
        floorId: sciFloor1.id,
        roomNumber: 'S102',
        type: RoomType.CLASSROOM,
        capacity: 40,
        coordinates: { x: 200, y: 90, width: 75, height: 60 },
        equipment: ['Projector', 'Whiteboard'],
      },
    ],
  });

  console.log('✅ Created rooms:', rooms.count);

  // Create sample schedules
  const allRooms = await prisma.room.findMany();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const schedules = [];
  for (let i = 0; i < 3; i++) {
    const room = allRooms[i];
    schedules.push(
      {
        roomId: room.id,
        className: 'Introduction to Computer Science',
        bookedBy: 'Dr. Ahmed Ali',
        startTime: new Date(today.getTime() + 8 * 60 * 60 * 1000), // 8 AM
        endTime: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10 AM
      },
      {
        roomId: room.id,
        className: 'Advanced Mathematics',
        bookedBy: 'Dr. Sara Khan',
        startTime: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10 AM
        endTime: new Date(today.getTime() + 12 * 60 * 60 * 1000), // 12 PM
      },
    );
  }

  await prisma.schedule.createMany({
    data: schedules,
  });

  console.log('✅ Created schedules');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
