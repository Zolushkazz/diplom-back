    import { Module } from '@nestjs/common';
    import { RequestController } from './request.controller';
    import { RequestService } from './request.service';
    import { TypeOrmModule } from '@nestjs/typeorm';
    import { Request, RequestShift } from './entities/request.entity';

    @Module({
    imports: [TypeOrmModule.forFeature([Request, RequestShift])],
    controllers: [RequestController],
    providers: [RequestService],
    })
    export class RequestModule {}
