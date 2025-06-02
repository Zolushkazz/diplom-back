import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log(user);

    const payload = {
      sub: user.id,
      username: user.username,
      jti: this.generateTokenId(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(
    username: string,
    password: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      username,
      password: hashedPassword,
      email,
    });

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      jti: this.generateTokenId(),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    console.log(user);
    return {
      username,
      password,
    };
  }

  private generateTokenId(): string {
    return require('crypto').randomBytes(16).toString('hex');
  }
}