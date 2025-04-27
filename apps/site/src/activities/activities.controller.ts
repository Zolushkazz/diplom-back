import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { CreateActivitiesDto, UpdateActivitiesDto } from './activities.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Post()
  async create(@Body() createActivityDto: CreateActivitiesDto) {
    return await this.activitiesService.create(createActivityDto);
  }

  @Get()
  async findAll() {
    return await this.activitiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.activitiesService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateActivityDto: UpdateActivitiesDto) {
    return await this.activitiesService.update(id, updateActivityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.activitiesService.remove(id);
  }
}
