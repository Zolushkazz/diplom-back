// activities.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import {
  ActivitiesResponseDto,
  CreateActivitiesDto,
  UpdateActivitiesDto,
} from './activities.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createActivityDto: CreateActivitiesDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ActivitiesResponseDto> {
    const fileNames = files?.map((file) => file.filename);
    return this.activitiesService.create(createActivityDto, fileNames);
  }

  @Get()
  async findAll(): Promise<ActivitiesResponseDto[]> {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ActivitiesResponseDto> {
    return this.activitiesService.findOne(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivitiesDto,
  ): Promise<ActivitiesResponseDto> {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.activitiesService.remove(+id);
  }
}
