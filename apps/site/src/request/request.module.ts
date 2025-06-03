import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request, RequestShift } from './entities/request.entity';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, RequestShift]),
    JwtModule.register({
      secret: 'your-secret-key', // Таны secret түлхүүр
      signOptions: { expiresIn: '1h' }, // Token хугацаа
    }),
  ],
  controllers: [RequestController],
  providers: [RequestService, RolesGuard],
})
export class RequestModule {}
