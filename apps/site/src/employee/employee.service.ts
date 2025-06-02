import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
  EmployeeResponseDto,
} from './employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    console.log('Received create request:', createEmployeeDto);
    const employee = this.employeeRepository.create(createEmployeeDto);
    const savedEmployee = await this.employeeRepository.save(employee);
    return this.toResponseDto(savedEmployee);
  }

  async findAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.employeeRepository.find();
    return employees.map(this.toResponseDto);
  }

  async findOne(id: number): Promise<EmployeeResponseDto> {
    const employee = await this.employeeRepository.findOne({ where: { id } });
    return this.toResponseDto(employee);
  }

  async update(
    id: number,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    await this.employeeRepository.update(id, updateEmployeeDto);
    const updatedEmployee = await this.employeeRepository.findOne({
      where: { id: updateEmployeeDto.id },
    });
    return this.toResponseDto(updatedEmployee);
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }

  async searchByName(name: string): Promise<EmployeeResponseDto[]> {
    const employees = await this.employeeRepository
      .createQueryBuilder('employee')
      .where('employee.name LIKE :name', { name: `%${name}%` })
      .getMany();
    return employees.map(this.toResponseDto);
  }

  private toResponseDto(employee: Employee): EmployeeResponseDto {
    if (!employee) return null;
    const {
      id,
      username,
      password,
      name,
      image,
      lastName,
      department,
      role,
      email,
      phone,
      workPhone,
      isActive,
      gender,
      address,
      familyName,
      birthDate,
      major,
      province,
      district,
    } = employee;
    return {
      id,
      username,
      password,
      name,
      image,
      lastName,
      department,
      role,
      email,
      phone,
      workPhone,
      isActive,
      gender,
      address,
      familyName,
      birthDate,
      major,
      province,
      district,
    };
  }
}
