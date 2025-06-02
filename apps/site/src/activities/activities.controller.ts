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
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('activities')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  @Roles('ADMIN', 'ORGANIZER')
  async create(
    @Body() createActivityDto: CreateActivitiesDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<ActivitiesResponseDto> {
    const fileNames = files?.map((file) => file.filename);
    return this.activitiesService.create(createActivityDto, fileNames);
  }

  @Get()
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  async findAll(): Promise<ActivitiesResponseDto[]> {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'ORGANIZER')
  async findOne(@Param('id') id: number): Promise<ActivitiesResponseDto> {
    return this.activitiesService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMIN', 'ORGANIZER')
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivitiesDto,
  ): Promise<ActivitiesResponseDto> {
    return this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'ORGANIZER')
  async remove(@Param('id') id: number): Promise<void> {
    return this.activitiesService.remove(+id);
  }
}
