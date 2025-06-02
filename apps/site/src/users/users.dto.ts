// users.dto.ts
import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsIn,
  IsEnum,
} from 'class-validator';
import { UserRole } from './entities/users.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message: 'Том үсэг, жижиг үсэг, тоо болон тэмдэгтийг хамруулсан байх ёстой',
  })
  password: string;

  @IsEnum(UserRole, {
    message: 'Role нь зөвхөн ADMIN, ORGANIZER, PARTICIPANT байж болно',
  })
  role: UserRole;
}

export class LoginDto {
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(8)
  password: string;
}
