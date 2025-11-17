import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FloorsService } from './floors.service';
import { CreateFloorDto } from './dto/create-floor.dto';
import { UpdateFloorDto } from './dto/update-floor.dto';
import { FloorResponseDto } from './dto/floor-response.dto';

@ApiTags('floors')
@ApiBearerAuth()
@Controller('floors')
export class FloorsController {
  constructor(private readonly service: FloorsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all floors' })
  @ApiResponse({
    status: 200,
    description: 'List of floors',
    type: [FloorResponseDto],
  })
  async findAll(): Promise<FloorResponseDto[]> {
    const floors = await this.service.findAll();
    return floors.map((f) => new FloorResponseDto(f));
  }

  @Get('building/:buildingId')
  @ApiOperation({ summary: 'Get floors by building ID' })
  @ApiResponse({
    status: 200,
    description: 'List of floors',
    type: [FloorResponseDto],
  })
  async findByBuildingId(
    @Param('buildingId') buildingId: string,
  ): Promise<FloorResponseDto[]> {
    const floors = await this.service.findByBuildingId(buildingId);
    return floors.map((f) => new FloorResponseDto(f));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get floor by ID' })
  @ApiResponse({
    status: 200,
    description: 'Floor details',
    type: FloorResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Floor not found' })
  async findById(@Param('id') id: string): Promise<FloorResponseDto> {
    const floor = await this.service.findById(id);
    return new FloorResponseDto(floor);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new floor' })
  @ApiResponse({
    status: 201,
    description: 'Floor created successfully',
    type: FloorResponseDto,
  })
  async create(@Body() dto: CreateFloorDto): Promise<FloorResponseDto> {
    const floor = await this.service.create(dto);
    return new FloorResponseDto(floor);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update floor' })
  @ApiResponse({
    status: 200,
    description: 'Floor updated successfully',
    type: FloorResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Floor not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateFloorDto,
  ): Promise<FloorResponseDto> {
    const floor = await this.service.update(id, dto);
    return new FloorResponseDto(floor);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete floor' })
  @ApiResponse({ status: 204, description: 'Floor deleted successfully' })
  @ApiResponse({ status: 404, description: 'Floor not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
