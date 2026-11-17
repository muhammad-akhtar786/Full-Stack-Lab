import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollment.entity.js';
import { Student } from '../students/student.entity.js';
import { Course } from '../courses/course.entity.js';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto.js';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  findAll() {
    return this.enrollmentRepository.find({
      relations: { student: true, course: true },
    });
  }

  async findOne(id: number) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: { id },
      relations: { student: true, course: true },
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return enrollment;
  }

  async create(dto: CreateEnrollmentDto) {
    const student = await this.studentRepository.findOneBy({
      id: dto.studentId,
    });
    if (!student) throw new NotFoundException('Student not found');

    const course = await this.courseRepository.findOneBy({
      id: dto.courseId,
    });
    if (!course) throw new NotFoundException('Course not found');

    const enrollment = this.enrollmentRepository.create({
      student,
      course,
      grade: dto.grade,
    });

    return this.enrollmentRepository.save(enrollment);
  }
}
