import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { ImportService, ImportResult } from './import.service';

@ApiTags('import')
@ApiBearerAuth()
@Controller('import')
export class ImportController {
  constructor(private readonly service: ImportService) {}

  @Post('buildings/json')
  @ApiOperation({ summary: 'Import buildings from JSON' })
  @ApiResponse({ status: 201, description: 'Import completed' })
  @ApiConsumes('application/json')
  async importBuildingsJSON(@Body() data: any): Promise<ImportResult> {
    return this.service.importBuildingsJSON(data);
  }

  @Post('rooms/csv')
  @ApiOperation({ summary: 'Import rooms from CSV' })
  @ApiResponse({ status: 201, description: 'Import completed' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async importRoomsCSV(@UploadedFile() file: Express.Multer.File): Promise<ImportResult> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('Only CSV files are allowed');
    }

    const content = file.buffer.toString('utf-8');
    return this.service.importRoomsCSV(content);
  }

  @Post('schedules/csv')
  @ApiOperation({ summary: 'Import schedules from CSV' })
  @ApiResponse({ status: 201, description: 'Import completed' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async importSchedulesCSV(@UploadedFile() file: Express.Multer.File): Promise<ImportResult> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!file.originalname.endsWith('.csv')) {
      throw new BadRequestException('Only CSV files are allowed');
    }

    const content = file.buffer.toString('utf-8');
    return this.service.importSchedulesCSV(content);
  }
}
