// activities.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activities } from './entities/activities.entity';
import {
  ActivitiesResponseDto,
  CreateActivitiesDto,
  UpdateActivitiesDto,
} from './activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activities)
    private activitiesRepository: Repository<Activities>,
  ) {}

  async create(
    createDto: CreateActivitiesDto,
    fileNames: string[] = [],
  ): Promise<Activities> {
    const newActivity = this.activitiesRepository.create({
      ...createDto,
      file: fileNames, // энд шинэ файл нэрсийг өгнө
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.activitiesRepository.save(newActivity);
  }

  async findAll(): Promise<Activities[]> {
    return this.activitiesRepository.find();
  }

  async findOne(id: number): Promise<Activities> {
    const activity = await this.activitiesRepository.findOne({ where: { id } });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(
    id: number,
    updateActivityDto: UpdateActivitiesDto,
  ): Promise<ActivitiesResponseDto> {
    await this.activitiesRepository.update(id, updateActivityDto);
    const updateActivity = await this.activitiesRepository.findOne({
      where: { id: updateActivityDto.id },
    });
    return this.toResponseDto(updateActivity);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
    await this.activitiesRepository.remove(activity);
  }

  private toResponseDto(activity: Activities): ActivitiesResponseDto {
    if (!activity) return null;
    const {
      id,
      authorId,
      activityName,
      activityType,
      department,
      status,
      startDate,
      startTime,
      endTime,
      district,
      lat,
      lng,
      participant,
      notes,
      decision,
      file,
      createdAt,
      updatedAt,
    } = activity;
    return {
      id,
      authorId,
      activityName,
      activityType,
      department,
      status,
      startDate,
      startTime,
      endTime,
      district,
      lat,
      lng,
      participant,
      notes,
      decision,
      file,
      createdAt,
      updatedAt,
    };
  }
}
