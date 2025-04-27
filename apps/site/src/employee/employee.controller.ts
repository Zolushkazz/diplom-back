import { Controller, Get, Post, Body, Put, Delete, Param, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto, EmployeeResponseDto } from './employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findAll();
  }

//   @Get('search')
//   async searchByName(@Query('name') name: string): Promise<EmployeeResponseDto[]> {
//     return this.employeeService.searchByName(name);
//   }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<EmployeeResponseDto> {
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  async update( @Param('id') id: number, @Body() updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(+id);
  }
}