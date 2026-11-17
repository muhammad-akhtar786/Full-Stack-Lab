import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOneBy({ id });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async create(dto: CreateCourseDto) {
    const course = this.courseRepository.create(dto);
    return this.courseRepository.save(course);
  }

  async update(id: number, dto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({ id, ...dto });
    if (!course) throw new NotFoundException('Course not found');
    return this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    await this.courseRepository.remove(course);
    return { message: 'Course deleted successfully' };
  }
}
