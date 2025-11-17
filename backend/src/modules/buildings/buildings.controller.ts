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
import { BuildingsService } from './buildings.service';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { BuildingResponseDto } from './dto/building-response.dto';

@ApiTags('buildings')
@Controller('buildings')
export class BuildingsController {
  constructor(private readonly service: BuildingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all buildings' })
  @ApiResponse({
    status: 200,
    description: 'List of all buildings',
    type: [BuildingResponseDto],
  })
  async findAll(): Promise<BuildingResponseDto[]> {
    const buildings = await this.service.findAll();
    return buildings.map((b) => new BuildingResponseDto(b));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get building by ID' })
  @ApiResponse({
    status: 200,
    description: 'Building details',
    type: BuildingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Building not found' })
  async findById(@Param('id') id: string): Promise<BuildingResponseDto> {
    const building = await this.service.findByIdWithRelations(id);
    return new BuildingResponseDto(building);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new building' })
  @ApiResponse({
    status: 201,
    description: 'Building created successfully',
    type: BuildingResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Building name already exists' })
  async create(@Body() dto: CreateBuildingDto): Promise<BuildingResponseDto> {
    const building = await this.service.create(dto);
    return new BuildingResponseDto(building);
  }

  @Put(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update building' })
  @ApiResponse({
    status: 200,
    description: 'Building updated successfully',
    type: BuildingResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Building not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateBuildingDto,
  ): Promise<BuildingResponseDto> {
    const building = await this.service.update(id, dto);
    return new BuildingResponseDto(building);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete building' })
  @ApiResponse({ status: 204, description: 'Building deleted successfully' })
  @ApiResponse({ status: 404, description: 'Building not found' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.service.delete(id);
  }
}
