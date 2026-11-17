
import { Controller, Get, Inject } from '@nestjs/common';
import { Department } from '../students/student.entity';

export const DEPARTMENTS = 'DEPARTMENTS';

@Controller('api/departments')
export class DepartmentsController {
  constructor(
    @Inject(DEPARTMENTS)
    private readonly departments: string[],
  ) {}

  @Get()
  getDepartments() {
    return this.departments;
  }
}
