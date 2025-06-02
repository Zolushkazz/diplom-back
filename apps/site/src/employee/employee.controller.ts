import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  EmployeeResponseDto,
} from './employee.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('employees')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @Roles('ADMIN')
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get()
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  async findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findAll();
  }

  //   @Get('search')
  //   async searchByName(@Query('name') name: string): Promise<EmployeeResponseDto[]> {
  //     return this.employeeService.searchByName(name);
  //   }

  @Get(':id')
  @Roles('ADMIN', 'ORGANIZER', 'PARTICIPANT')
  async findOne(@Param('id') id: string): Promise<EmployeeResponseDto> {
    return this.employeeService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMIN')
  async update(
    @Param('id') id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async remove(@Param('id') id: string): Promise<void> {
    return this.employeeService.remove(+id);
  }
}
