import {
  ConflictException, Inject, Injectable, NotFoundException,
} from '@nestjs/common';
import { AppLogger } from '../common/logger/app-logger';
import { Course, CourseDepartment, CourseStatistics } from './course.entity';
import { CreditService } from './credit.service';
import { CodeParamDto } from './dto/code-param.dto';
import { CreateCourseDto } from './dto/create-course.dto';
import { QueryCourseDto } from './dto/query-course.dto';
import { ReplaceCourseDto } from './dto/replace-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { COURSE_STORE, CourseStore } from './store/course-store';

@Injectable()
export class CoursesService {
  constructor(
    @Inject(COURSE_STORE) private readonly store: CourseStore,
    private readonly credits: CreditService,
    private readonly logger: AppLogger,
  ) {}

  private async locate(code: string) {
    const courses = await this.store.readAll();
    const index = courses.findIndex((course) => course.code === code.toUpperCase());
    if (index < 0) {
      throw new NotFoundException(`Course ${code} not found`);
    }
    return { courses, index };
  }

  async findAll(query: QueryCourseDto = {}): Promise<Course[]> {
    let courses = await this.store.readAll();
    if (query.search) {
      const search = query.search.toLowerCase();
      courses = courses.filter((course) =>
        course.code.toLowerCase().includes(search) ||
        course.title.toLowerCase().includes(search) ||
        course.instructor.toLowerCase().includes(search));
    }
    if (query.department) {
      courses = courses.filter((course) => course.department === query.department);
    }
    if (query.minCredits !== undefined) {
      courses = courses.filter((course) => course.credits >= query.minCredits);
    }
    if (query.maxCredits !== undefined) {
      courses = courses.filter((course) => course.credits <= query.maxCredits);
    }
    if (query.sort) {
      const direction = query.order === 'desc' ? -1 : 1;
      courses.sort((a, b) => {
        const left = a[query.sort];
        const right = b[query.sort];
        if (typeof left === 'number' && typeof right === 'number') {
          return (left - right) * direction;
        }
        return String(left).localeCompare(String(right)) * direction;
      });
    }
    return query.limit ? courses.slice(0, query.limit) : courses;
  }

  async stats(): Promise<CourseStatistics> {
    const courses = await this.store.readAll();
    const totalCredits = this.credits.totalCredits(courses);
    const byDepartment: Record<string, number> = {
      [CourseDepartment.CS]: 0,
      [CourseDepartment.SE]: 0,
      [CourseDepartment.DS]: 0,
    };
    courses.forEach((course) => {
      byDepartment[course.department] = (byDepartment[course.department] ?? 0) + 1;
    });
    return {
      totalCourses: courses.length,
      totalCredits,
      averageCredits: this.credits.averageCredits(courses),
      overloaded: totalCredits > 18,
      byDepartment,
    };
  }

  async findOne({ code }: CodeParamDto): Promise<Course> {
    const { courses, index } = await this.locate(code);
    return courses[index];
  }

  async create(dto: CreateCourseDto): Promise<Course> {
    const courses = await this.store.readAll();
    if (courses.some((course) => course.code === dto.code)) {
      throw new ConflictException(`Course ${dto.code} already exists`);
    }
    const course: Course = { ...dto };
    courses.push(course);
    await this.store.writeAll(courses);
    this.logger.log(`Created course ${course.code}`);
    return course;
  }

  async replace(code: string, dto: ReplaceCourseDto): Promise<Course> {
    const { courses, index } = await this.locate(code);
    courses[index] = { ...dto, code: courses[index].code };
    await this.store.writeAll(courses);
    this.logger.log(`Replaced course ${courses[index].code}`);
    return courses[index];
  }

  async update(code: string, dto: UpdateCourseDto): Promise<Course> {
    const { courses, index } = await this.locate(code);
    const changes = Object.fromEntries(
      Object.entries(dto).filter(([, value]) => value !== undefined));
    courses[index] = { ...courses[index], ...changes };
    await this.store.writeAll(courses);
    this.logger.log(`Updated course ${courses[index].code}`);
    return courses[index];
  }

  async remove(code: string): Promise<void> {
    const { courses, index } = await this.locate(code);
    const [removed] = courses.splice(index, 1);
    await this.store.writeAll(courses);
    this.logger.log(`Deleted course ${removed.code}`);
  }
}
