import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './common/prisma/prisma.module';
import { BuildingsModule } from './modules/buildings/buildings.module';
import { FloorsModule } from './modules/floors/floors.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { SchedulesModule } from './modules/schedules/schedules.module';
import { ImportModule } from './modules/import/import.module';
import { RealtimeModule } from './modules/realtime/realtime.module';
import { AuthModule } from './modules/auth/auth.module';
import { configValidation } from './config/config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: configValidation,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PrismaModule,
    BuildingsModule,
    FloorsModule,
    RoomsModule,
    SchedulesModule,
    ImportModule,
    RealtimeModule,
    AuthModule,
  ],
})
export class AppModule {}
