import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import { Course } from '../course.entity';

export const COURSE_STORE = Symbol('COURSE_STORE');

export interface CourseStore {
  readAll(): Promise<Course[]>;
  writeAll(courses: Course[]): Promise<void>;
}

export class InMemoryCourseStore implements CourseStore {
  private courses: Course[];

  constructor(initial: Course[] = []) {
    this.courses = initial.map((course) => ({ ...course }));
  }

  async readAll(): Promise<Course[]> {
    return this.courses.map((course) => ({ ...course }));
  }

  async writeAll(courses: Course[]): Promise<void> {
    this.courses = courses.map((course) => ({ ...course }));
  }
}

export class JsonFileCourseStore implements CourseStore {
  constructor(private readonly filePath: string) {}

  async readAll(): Promise<Course[]> {
    try {
      return JSON.parse(await readFile(this.filePath, 'utf-8')) as Course[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  async writeAll(courses: Course[]): Promise<void> {
    await mkdir(dirname(this.filePath), { recursive: true });
    await writeFile(this.filePath, JSON.stringify(courses, null, 2));
  }
}
