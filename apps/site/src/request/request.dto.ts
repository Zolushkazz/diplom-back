import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateRequestDto { 
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDateString()
  startDate: string;

  @IsString()
  notes?: string;
}

export class UpdateRequestDto extends CreateRequestDto {
  @IsNotEmpty()
  id: number;
}

export class RequestResponseDto {
  id: number;
  name: string;
  notes: string;
  startDate: string;
  createdAt: Date;
  updatedAt: Date;
}
