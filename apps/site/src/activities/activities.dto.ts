// activities.dto.ts
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsDateString,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class CreateActivitiesDto {
  @IsString()
  @IsOptional()
  authorId: string;

  @IsString()
  @IsOptional()
  activityName: string;

  @IsString()
  @IsOptional()
  activityType: string;

  @IsString()
  @IsOptional()
  department: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsDateString()
  @IsOptional()
  startDate: Date;

  @IsOptional()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  endTime: string;

  @IsString()
  @IsOptional()
  district: string;

  @IsString()
  @IsOptional()
  lat: string;

  @IsString()
  @IsOptional()
  lng: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParticipantDto)
  participant: ParticipantDto[];

  @IsString()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  decision: string;

  @IsArray()
  @IsOptional()
  file: string[];

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;
}

export class UpdateActivitiesDto extends CreateActivitiesDto {
  @IsNotEmpty()
  id: number;
}

export class ActivitiesResponseDto {
  id: number;
  authorId: string;
  activityName: string;
  activityType: string;
  department: string;
  status: string;
  startDate: Date;
  startTime: string;
  endTime: string;
  district: string;
  lat: string;
  lng: string;
  participant: ParticipantDto[];
  notes: string;
  decision: string;
  file: string[];
  createdAt: Date;
  updatedAt: Date;
}

class ParticipantDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  image?: string;
}
