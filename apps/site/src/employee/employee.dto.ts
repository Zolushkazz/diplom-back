import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { GenderEnum } from './entities/employee.entity';

export class CreateEmployeeDto {
  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('MN')
  @IsOptional()
  phone?: string;

  @IsPhoneNumber('MN')
  @IsOptional()
  workPhone?: string;

  @IsString()
  @IsOptional()
  familyName?: string;

  @IsOptional()
  @IsString()
  birthDate?: string;

  @IsString()
  @IsOptional()
  major?: string;

  @IsEnum(GenderEnum)
  @IsOptional()
  gender?: GenderEnum;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  province?: string;

  @IsString()
  @IsOptional()
  district?: string;
}

export class UpdateEmployeeDto extends CreateEmployeeDto {
  @IsNotEmpty()
  id: number;
}

export class EmployeeResponseDto {
  id: number;
  username: string;
  name: string;
  image: string;
  lastName: string;
  department: string;
  role: string;
  email: string;
  phone: string;
  workPhone: string;
  password: string;
  familyName: string;
  birthDate: string;
  major: string;
  gender: GenderEnum;
  address: string;
  province: string;
  district: string;
  isActive: boolean;
}

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthResponseDto {
  token: string;
  employee: EmployeeResponseDto;
}
