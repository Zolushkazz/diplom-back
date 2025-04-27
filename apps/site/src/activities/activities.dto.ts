import { IsString, IsOptional, IsArray, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateActivitiesDto {
  @IsString()
  activityName: string;

  @IsString()
  activityType: string;

  @IsString()
  department: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  startDate?: string; // ISO format date (e.g., 2025-04-28)

  @IsOptional()
  startTime?: string; // ISO format time (e.g., 14:30:00)

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  participant?: string[];

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  decision?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  file?: string[];
}

export class UpdateActivitiesDto extends CreateActivitiesDto {
  @IsNotEmpty()
  id: number;
}

export class ActivitiesResponseDto {
    id: number;
    activityName: string;
    activityType: string;
    department: string;
    createdAt: Date;
    updatedAt: Date;
    status?: string;
    startDate?: string;
    startTime?: string;
    district?: string;
    participant?: string[];
    notes?: string;
    decision?: string;
    file?: string[];
    isVerified: boolean;
  }
  
