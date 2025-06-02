import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RequestService } from './request.service';
import {
  CreateRequestDto,
  RequestResponseDto,
  UpdateRequestDto,
  ShiftOrderDto,
} from './request.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('create')
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get()
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  findAll(): Promise<RequestResponseDto[]> {
    return this.requestService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  async update(
    @Param('id') id: number,
    @Body() updateRequestDto: UpdateRequestDto,
  ): Promise<RequestResponseDto> {
    return this.requestService.update(id, updateRequestDto);
  }

  @Post('/shift')
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  async shiftOrder(@Body() dto: ShiftOrderDto): Promise<RequestResponseDto> {
    return await this.requestService.shiftReq(dto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
