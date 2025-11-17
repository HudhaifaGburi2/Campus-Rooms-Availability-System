import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/common/prisma/prisma.service';
import { parse } from 'csv-parse/sync';
import { RoomType, Prisma } from '@prisma/client';

export interface ImportResult {
  success: boolean;
  totalRows: number;
  successCount: number;
  errorCount: number;
  errors: Array<{ row: number; error: string }>;
}

@Injectable()
export class ImportService {
  constructor(private readonly prisma: PrismaService) {}

  async importBuildingsJSON(data: any): Promise<ImportResult> {
    const result: ImportResult = {
      success: true,
      totalRows: 0,
      successCount: 0,
      errorCount: 0,
      errors: [],
    };

    if (!data.buildings || !Array.isArray(data.buildings)) {
      throw new BadRequestException('Invalid JSON format: buildings array required');
    }

    result.totalRows = data.buildings.length;

    await this.prisma.$transaction(async (tx) => {
      for (let i = 0; i < data.buildings.length; i++) {
        try {
          const buildingData = data.buildings[i];

          const building = await tx.building.create({
            data: {
              name: buildingData.name,
              description: buildingData.description,
            },
          });

          if (buildingData.floors && Array.isArray(buildingData.floors)) {
            for (const floorData of buildingData.floors) {
              const floor = await tx.floor.create({
                data: {
                  buildingId: building.id,
                  floorNumber: floorData.floor_number,
                  mapData: floorData.map_data,
                },
              });

              if (floorData.rooms && Array.isArray(floorData.rooms)) {
                for (const roomData of floorData.rooms) {
                  await tx.room.create({
                    data: {
                      floorId: floor.id,
                      roomNumber: roomData.room_number,
                      type: roomData.type as RoomType,
                      capacity: roomData.capacity,
                      coordinates: roomData.coordinates,
                      equipment: roomData.equipment || [],
                    },
                  });
                }
              }
            }
          }

          result.successCount++;
        } catch (error: any) {
          result.errorCount++;
          result.errors.push({
            row: i + 1,
            error: error.message,
          });
        }
      }
    });

    // Log import result
    await this.prisma.importLog.create({
      data: {
        fileName: 'buildings.json',
        totalRows: result.totalRows,
        errorCount: result.errorCount,
        errors: result.errors.length > 0 ? result.errors : Prisma.JsonNull,
        status: result.errorCount === 0 ? 'success' : 'partial',
      },
    });

    result.success = result.errorCount === 0;
    return result;
  }

  async importRoomsCSV(csvContent: string): Promise<ImportResult> {
    const result: ImportResult = {
      success: true,
      totalRows: 0,
      successCount: 0,
      errorCount: 0,
      errors: [],
    };

    try {
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      result.totalRows = records.length;

      await this.prisma.$transaction(async (tx) => {
        for (let i = 0; i < records.length; i++) {
          try {
            const row = records[i];

            // Find building
            const building = await tx.building.findUnique({
              where: { name: row.building_name },
            });

            if (!building) {
              throw new Error(`Building not found: ${row.building_name}`);
            }

            // Find or create floor
            let floor = await tx.floor.findFirst({
              where: {
                buildingId: building.id,
                floorNumber: parseInt(row.floor_number),
              },
            });

            if (!floor) {
              floor = await tx.floor.create({
                data: {
                  buildingId: building.id,
                  floorNumber: parseInt(row.floor_number),
                },
              });
            }

            // Create room
            await tx.room.create({
              data: {
                floorId: floor.id,
                roomNumber: row.room_number,
                type: row.type as RoomType,
                capacity: parseInt(row.capacity),
                coordinates: row.x && row.y ? {
                  x: parseInt(row.x),
                  y: parseInt(row.y),
                } : Prisma.JsonNull,
                equipment: row.equipment ? row.equipment.split(';') : [],
              },
            });

            result.successCount++;
          } catch (error: any) {
            result.errorCount++;
            result.errors.push({
              row: i + 2, // +2 because of header and 0-index
              error: error.message,
            });
          }
        }
      });

      // Log import result
      await this.prisma.importLog.create({
        data: {
          fileName: 'rooms.csv',
          totalRows: result.totalRows,
          errorCount: result.errorCount,
          errors: result.errors.length > 0 ? result.errors : Prisma.JsonNull,
          status: result.errorCount === 0 ? 'success' : 'partial',
        },
      });

      result.success = result.errorCount === 0;
    } catch (error: any) {
      throw new BadRequestException(`CSV parsing error: ${error.message}`);
    }

    return result;
  }

  async importSchedulesCSV(csvContent: string): Promise<ImportResult> {
    const result: ImportResult = {
      success: true,
      totalRows: 0,
      successCount: 0,
      errorCount: 0,
      errors: [],
    };

    try {
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      result.totalRows = records.length;

      await this.prisma.$transaction(async (tx) => {
        for (let i = 0; i < records.length; i++) {
          try {
            const row = records[i];

            // Find room by room number
            const room = await tx.room.findFirst({
              where: { roomNumber: row.room_number },
            });

            if (!room) {
              throw new Error(`Room not found: ${row.room_number}`);
            }

            // Create schedule
            await tx.schedule.create({
              data: {
                roomId: room.id,
                className: row.class_name,
                bookedBy: row.booked_by,
                startTime: new Date(row.start_time),
                endTime: new Date(row.end_time),
              },
            });

            result.successCount++;
          } catch (error: any) {
            result.errorCount++;
            result.errors.push({
              row: i + 2,
              error: error.message,
            });
          }
        }
      });

      // Log import result
      await this.prisma.importLog.create({
        data: {
          fileName: 'schedules.csv',
          totalRows: result.totalRows,
          errorCount: result.errorCount,
          errors: result.errors.length > 0 ? result.errors : Prisma.JsonNull,
          status: result.errorCount === 0 ? 'success' : 'partial',
        },
      });

      result.success = result.errorCount === 0;
    } catch (error: any) {
      throw new BadRequestException(`CSV parsing error: ${error.message}`);
    }

    return result;
  }
}
