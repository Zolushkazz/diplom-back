import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    JwtModule.register({
      secret: 'your-secret-key', // Таны secret түлхүүр
      signOptions: { expiresIn: '1h' }, // Token хугацаа
    }),
  ],
  providers: [EmployeeService, RolesGuard],
  exports: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
