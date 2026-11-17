import { Injectable } from '@nestjs/common';
import { Course } from './course.entity';

@Injectable()
export class CreditService {
  totalCredits(courses: Course[]): number {
    return courses.reduce((total, course) => total + course.credits, 0);
  }

  averageCredits(courses: Course[]): number {
    return courses.length
      ? Number((this.totalCredits(courses) / courses.length).toFixed(2))
      : 0;
  }
}
