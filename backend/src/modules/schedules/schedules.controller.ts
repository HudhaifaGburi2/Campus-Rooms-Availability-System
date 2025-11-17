import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { QuerySchedulesDto } from './dto/query-schedules.dto';
import { ScheduleResponseDto } from './dto/schedule-response.dto';

@ApiTags('schedules')
@ApiBearerAuth()
@Controller('schedules')
export class SchedulesController {
  constructor(private readonly service: SchedulesService) {}

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Get schedules for a specific room' })
  @ApiResponse({
    status: 200,
    description: 'List of schedules',
    type: [ScheduleResponseDto],
  })
  async findByRoomId(
    @Param('roomId') roomId: string,
    @Query() query: QuerySchedulesDto,
  ): Promise<ScheduleResponseDto[]> {
    const schedules = await this.service.findByRoomId(roomId, query);
    return schedules.map((s) => new ScheduleResponseDto(s));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get schedule by ID' })
  @ApiResponse({
    status: 200,
    description: 'Schedule details',
    type: ScheduleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async findById(@Param('id') id: string): Promise<ScheduleResponseDto> {
    const schedule = await this.service.findById(id);
    return new ScheduleResponseDto(schedule);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new schedule' })
  @ApiResponse({
    status: 201,
    description: 'Schedule created successfully',
    type: ScheduleResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Scheduling conflict' })
  async create(@Body() dto: CreateScheduleDto): Promise<ScheduleResponseDto> {
    const schedule = await this.service.create(dto);
    return new ScheduleResponseDto(schedule);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update schedule' })
  @ApiResponse({
    status: 200,
    description: 'Schedule updated successfully',
    type: ScheduleResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateScheduleDto,
  ): Promise<ScheduleResponseDto> {
    const schedule = await this.service.update(id, dto);
    return new ScheduleResponseDto(schedule);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete schedule' })
  @ApiResponse({ status: 204, description: 'Schedule deleted successfully' })
  @ApiResponse({ status: 404, description: 'Schedule not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
