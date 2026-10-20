
import { Injectable } from '@nestjs/common';
import { StudentsService } from '../students/students.service';

@Injectable()
export class HonorRollService {
  constructor(private readonly studentsService: StudentsService) {}

  async getHonorRoll() {
    return this.studentsService.findAll({
      minCgpa: 3.0,
      sort: 'cgpa',
      order: 'desc',
    });
  }
}
