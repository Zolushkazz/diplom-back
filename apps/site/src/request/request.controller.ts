import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, RequestResponseDto, UpdateRequestDto, ShiftOrderDto, CloseShiftDto } from './request.dto';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @Post('create')
  create(@Body() createRequestDto: CreateRequestDto) {
    return this.requestService.create(createRequestDto);
  }

  @Get()
  findAll(): Promise<RequestResponseDto[]>  {
    return this.requestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestService.findOne(id);
  }

  @Put(':id')
    async update( @Param('id') id: number, @Body() updateRequestDto: UpdateRequestDto): Promise<RequestResponseDto> {
      return this.requestService.update(id, updateRequestDto);
    }

  @Post('/shift')
  async shiftOrder(@Body() dto: ShiftOrderDto): Promise<RequestResponseDto> {
    return await this.requestService.shiftReq(dto);
  }

  @Post('/close')
  async closeShift(@Body() dto: CloseShiftDto): Promise<RequestResponseDto> {
    return await this.requestService.closeShift(dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
