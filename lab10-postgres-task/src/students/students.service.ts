import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity.js';
import { CreateStudentDto } from './dto/create-student.dto.js';
import { UpdateStudentDto } from './dto/update-student.dto.js';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  findAll() {
    return this.studentRepository.find();
  }

  async findOne(id: number) {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async create(dto: CreateStudentDto) {
    const student = this.studentRepository.create(dto);
    return this.studentRepository.save(student);
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.studentRepository.preload({ id, ...dto });
    if (!student) throw new NotFoundException('Student not found');
    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    await this.studentRepository.remove(student);
    return { message: 'Student deleted successfully' };
  }
}
