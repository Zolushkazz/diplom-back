import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

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
