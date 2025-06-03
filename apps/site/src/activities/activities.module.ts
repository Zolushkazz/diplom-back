// activities.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activities } from './entities/activities.entity';
import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activities]),
    JwtModule.register({
      secret: 'your-secret-key', // Таны secret түлхүүр
      signOptions: { expiresIn: '1h' }, // Token хугацаа
    }),
  ],
  providers: [ActivitiesService, RolesGuard],
  exports: [ActivitiesService],
  controllers: [ActivitiesController],
})
export class ActivitiesModule {}
