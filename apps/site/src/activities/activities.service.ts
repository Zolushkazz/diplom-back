import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activities } from './entities/activities.entity';
import { CreateActivitiesDto, UpdateActivitiesDto } from './activities.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activities)
    private readonly activitiesRepository: Repository<Activities>,
  ) {}

  async create(createActivityDto: CreateActivitiesDto): Promise<Activities> {
    const activity = this.activitiesRepository.create(createActivityDto);
    return await this.activitiesRepository.save(activity);
  }

  async findAll(): Promise<Activities[]> {
    return await this.activitiesRepository.find();
  }

  async findOne(id: number): Promise<Activities> {
    return await this.activitiesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateActivityDto: UpdateActivitiesDto): Promise<Activities> {
    await this.activitiesRepository.update(id, updateActivityDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}
