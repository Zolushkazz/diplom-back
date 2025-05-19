import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/users.entity';
import { UsersModule } from './users/users.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Employee } from './employee/entities/employee.entity';
import { EmployeeModule } from './employee/employee.module';
import { Activities } from './activities/entities/activities.entity';
import { ActivitiesModule } from './activities/activities.module';
import { RequestModule } from './request/request.module';
import { Request } from './request/entities/request.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: +config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [User, Employee, Activities, Request],
        // synchronize: config.get('NODE_ENV') !== 'production',
        synchronize: true,
        schema: 'site',
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    EmployeeModule,
    ActivitiesModule,,
    RequestModule,
  ],
})
export class AppModule {}
