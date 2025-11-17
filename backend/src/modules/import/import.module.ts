import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { BuildingsModule } from '../buildings/buildings.module';
import { FloorsModule } from '../floors/floors.module';
import { RoomsModule } from '../rooms/rooms.module';
import { SchedulesModule } from '../schedules/schedules.module';

@Module({
  imports: [BuildingsModule, FloorsModule, RoomsModule, SchedulesModule],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule {}
