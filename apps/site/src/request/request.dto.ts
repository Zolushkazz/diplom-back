import { IsNotEmpty, IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';

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
  receiverName: string;
  createdAt: Date;
  updatedAt: Date;
  shift?: any
}

export class ShiftOrderDto {
  @IsNumber()
  shiftId: number;

  @IsOptional()
  @IsString()
  receiverName?: string;
}
export class CloseShiftDto {
  @IsNumber()
  id: number;

  @IsString()
  state?: "cancelled" | "closed";

  @IsOptional()
  @IsString()
  note: string
}

