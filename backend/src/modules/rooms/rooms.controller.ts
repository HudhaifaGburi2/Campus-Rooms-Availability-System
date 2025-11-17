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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { QueryRoomsDto } from './dto/query-rooms.dto';
import { RoomResponseDto } from './dto/room-response.dto';

@ApiTags('rooms')
@ApiBearerAuth()
@Controller('rooms')
export class RoomsController {
  constructor(private readonly service: RoomsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rooms or search with filters' })
  @ApiResponse({
    status: 200,
    description: 'List of rooms',
    type: [RoomResponseDto],
  })
  async findAll(@Query() query: QueryRoomsDto): Promise<RoomResponseDto[]> {
    const rooms =
      Object.keys(query).length > 0
        ? await this.service.findWithFilters(query)
        : await this.service.findAll();
    return rooms.map((r) => new RoomResponseDto(r));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get room by ID' })
  @ApiResponse({
    status: 200,
    description: 'Room details',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Room not found' })
  async findById(@Param('id') id: string): Promise<RoomResponseDto> {
    const room = await this.service.findById(id);
    return new RoomResponseDto(room);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({
    status: 201,
    description: 'Room created successfully',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Room already exists' })
  async create(@Body() dto: CreateRoomDto): Promise<RoomResponseDto> {
    const room = await this.service.create(dto);
    return new RoomResponseDto(room);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update room' })
  @ApiResponse({
    status: 200,
    description: 'Room updated successfully',
    type: RoomResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Room not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateRoomDto,
  ): Promise<RoomResponseDto> {
    const room = await this.service.update(id, dto);
    return new RoomResponseDto(room);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete room' })
  @ApiResponse({ status: 204, description: 'Room deleted successfully' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
