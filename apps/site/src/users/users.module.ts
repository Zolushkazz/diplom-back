import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your-secret-key', // Таны secret түлхүүр
      signOptions: { expiresIn: '1h' }, // Token хугацаа
    }),
  ],
  providers: [UsersService],
  exports: [UsersService], 
  controllers: [UsersController], 
})
export class UsersModule {}
