import { Injectable } from '@nestjs/common';
import { CreateRequestDto, RequestResponseDto, UpdateRequestDto } from './request.dto';
import { Request } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
   constructor(
     @InjectRepository(Request)
     private requetsRepository: Repository<Request>,
   ) {}

  async create(createRequestDto: CreateRequestDto): Promise<RequestResponseDto> {
    const request = this.requetsRepository.create(createRequestDto);
    const savedRequest = await this.requetsRepository.save(request);
    return this.toResponseDto(savedRequest);
  }

    async findAll(): Promise<RequestResponseDto[]> {
      const requests = await this.requetsRepository.find();
      return requests.map(this.toResponseDto);
    }
  
    async findOne(id: number): Promise<RequestResponseDto> {
      const request = await this.requetsRepository.findOne({ where: { id } });
      return this.toResponseDto(request);
    }
  
    async update(id: number, updateRequestDto: UpdateRequestDto): Promise<RequestResponseDto> {
      await this.requetsRepository.update(id, updateRequestDto);
      const updatedRequest = await this.requetsRepository.findOne({ where: { id: updateRequestDto.id } });
      return this.toResponseDto(updatedRequest);
    }
  
    async remove(id: number): Promise<void> {
      await this.requetsRepository.delete(id);
    }
  
    async searchByName(name: string): Promise<RequestResponseDto[]> {
      const employees = await this.requetsRepository
        .createQueryBuilder('request')
        .where('request.name LIKE :name', { name: `%${name}%` })
        .getMany();
      return employees.map(this.toResponseDto);
    }
  
  private toResponseDto(request: Request): RequestResponseDto {
    if (!request) return null;
    const { id, name, notes, startDate, createdAt, updatedAt} = request;
    return { id, name, notes, startDate, createdAt, updatedAt };
  }
}
