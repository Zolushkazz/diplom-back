import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/users.entity';

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

    console.log('Bataa', user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    console.log('BUldruu', user);

    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      jti: this.generateTokenId(),
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      }),
    };
  }

  async signUp(
    username: string,
    password: string,
    email: string,
    role: UserRole,
  ): Promise<{ accessToken: string }> {
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new UnauthorizedException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      username,
      role,
      password: hashedPassword,
      email,
    });

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      jti: this.generateTokenId(),
    };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET || 'your-secret-key',
      }),
    };
  }

  private async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    console.log('ascascu', user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    console.log(user);
    return {
      role: user.role,
      username,
      password,
    };
  }

  private generateTokenId(): string {
    return require('crypto').randomBytes(16).toString('hex');
  }
}
