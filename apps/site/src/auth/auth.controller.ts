import { Body, Controller, Post, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../users/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { accessToken } = await this.authService.signIn(
      loginDto.username,
      loginDto.password,
    );

    // 🟢 Cookie-д бичихгүй, accessToken-ийг JSON-р буцаана
    return {
      message: 'Login successful',
      access_token: accessToken, // 🟢 Ийм нэрээр буцаана (frontend кодонд тохирсон)
    };
  }

  // @Post('login')
  // async login(
  //   @Body() loginDto: LoginDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const { accessToken } = await this.authService.signIn(
  //     loginDto.username,
  //     loginDto.password,
  //   );

  //   res.cookie('access_token', accessToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //     maxAge: 60 * 60 * 1000,
  //     path: '/',
  //   });

  //   return { message: 'Login successful', accessToken };
  // }

  @Post('signup')
  async register(@Body() signUpDto: CreateUserDto) {
    const { accessToken } = await this.authService.signUp(
      signUpDto.username,
      signUpDto.password,
      signUpDto.email,
      signUpDto.role,
    );

    return {
      message: 'Registration successful',
      access_token: accessToken,
    };
  }

  // @Post('signup')
  // async register(
  //   @Body() signUpDto: CreateUserDto,
  //   @Res({ passthrough: true }) res: Response,
  // ) {
  //   const { accessToken } = await this.authService.signUp(
  //     signUpDto.username,
  //     signUpDto.password,
  //     signUpDto.email,
  //     signUpDto.role,
  //   );

  //   res.cookie('access_token', accessToken, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'lax',
  //     maxAge: 60 * 60 * 1000,
  //     path: '/',
  //   });

  //   return {
  //     message: 'Registration successful',
  //     accessToken,
  //   };
  // }

  @Post('logout')
  async logout() {
    // Cookie байхгүй тул зөвхөн message л буцаана
    return { message: 'Logout successful' };
  }
}
