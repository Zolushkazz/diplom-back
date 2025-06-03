import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CloseShiftDto, CreateRequestDto, RequestResponseDto, ShiftOrderDto, UpdateRequestDto } from './request.dto';
import { Request, RequestShift } from './entities/request.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RequestService {
   constructor(
     @InjectRepository(Request)
     private requetsRepository: Repository<Request>,
     @InjectRepository(RequestShift)
     private requestsShiftRepository: Repository<RequestShift>,
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
  
    async findOne(id: string): Promise<any> {
      const requestId = parseInt(id)
      const request = await this.requetsRepository.findOne({ where: { id: requestId } });
      const requestShift = await this.requestsShiftRepository.findOne({where: {requestId: requestId}})
      return this.toResponseDto({...request, shift: requestShift});
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

// service
  async shiftReq(dto: ShiftOrderDto): Promise<RequestResponseDto> {
  try {
    const { shiftId, receiverName } = dto;
    console.log('Incoming DTO:', dto);

    const shift = await this.requetsRepository.findOne({
      where: { id: shiftId },
    });
 
    if (!shift) {
      console.warn('Shift not found for ID:', shiftId);
      throw new NotFoundException('Shift not found');
    }

    if (receiverName !== undefined) {
      shift.receiverName = receiverName;
    }

    const updated = await this.requetsRepository.save(shift); 
    return this.toResponseDto(updated);
  } catch (err) {
    console.error('ShiftReq Error:', err);
    throw new InternalServerErrorException('Something went wrong');
  }
}

async closeShift(dto: CloseShiftDto): Promise<RequestResponseDto> {
  try {
    const { id, state, note } = dto;

    console.log('Incoming DTO:', dto);

    // 1. Validate the request exists
    const request = await this.requetsRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException("Request not found");
    }

    // 2. Check if shift already exists
    let shift = await this.requestsShiftRepository.findOne({
      where: { requestId: id },
    });

    let updatedShift;

    // 3. If shift exists and we got new state, update it
    if (shift && state !== undefined) {
      shift.state = state;
      shift.note = note;
      updatedShift = await this.requestsShiftRepository.save(shift);
    } 
    // 4. If shift doesn’t exist, create a new one
    else {
      shift = this.requestsShiftRepository.create({
        requestId: id,
        state,
        note,
      });
      updatedShift = await this.requestsShiftRepository.save(shift);
    }

    return this.toResponseDto(updatedShift);

  } catch (err) {
    console.error('ShiftReq Error:', err);
    throw new InternalServerErrorException('Something went wrong');
  }
}

  private toResponseDto(request: Request &any): RequestResponseDto {
    if (!request) return null;
    const { id, name, notes, startDate, receiverName, createdAt, updatedAt, shift} = request;
    return { id, name, notes, startDate, receiverName, createdAt, updatedAt, shift };
  }
}
