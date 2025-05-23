import { Body, Controller, Get, Param, Post, Delete, Put } from '@nestjs/common';
import { RequestService } from './request.service';
import { CreateRequestDto, RequestResponseDto, UpdateRequestDto } from './request.dto';

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
    return this.requestService.findOne(+id);
  }

  @Put(':id')
    async update( @Param('id') id: number, @Body() updateRequestDto: UpdateRequestDto): Promise<RequestResponseDto> {
      return this.requestService.update(id, updateRequestDto);
    }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requestService.remove(+id);
  }
}
