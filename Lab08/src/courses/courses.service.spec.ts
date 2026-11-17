import { ConflictException, NotFoundException } from '@nestjs/common';
import { AppLogger } from '../common/logger/app-logger';
import { SEED_COURSES } from './courses.seed';
import { CoursesService } from './courses.service';
import { CreditService } from './credit.service';
import { InMemoryCourseStore, COURSE_STORE } from './store/course-store';
import { CourseDepartment } from './course.entity';

describe('CoursesService', () => {
  let service: CoursesService;
  let store: InMemoryCourseStore;
  const logger = { log: jest.fn() };

  beforeEach(() => {
    store = new InMemoryCourseStore(SEED_COURSES);
    logger.log.mockClear();
    service = new CoursesService(
      store,
      new CreditService(),
      logger as AppLogger,
    );
  });

  it('lists the six seeded courses', async () => {
    expect(await service.findAll({})).toHaveLength(6);
  });

  it('filters by department, minimum credits, and search term', async () => {
    const courses = await service.findAll({
      department: CourseDepartment.CS,
      minCredits: 3,
      search: 'data',
    });
    expect(courses.map((course) => course.code)).toEqual(['CS202', 'CS-301L']);
  });

  it('sorts results and applies a limit', async () => {
    const courses = await service.findAll({
      sort: 'credits',
      order: 'desc',
      limit: 2,
    });
    expect(courses).toHaveLength(2);
    expect(courses.map((course) => course.credits)).toEqual([3, 3]);
  });

  it('calculates course and credit statistics', async () => {
    await expect(service.stats()).resolves.toEqual({
      totalCourses: 6,
      totalCredits: 17,
      averageCredits: 2.83,
      overloaded: false,
      byDepartment: {
        'Computer Science': 3,
        'Software Engineering': 2,
        'Data Science': 1,
      },
    });
  });

  it('marks a course load above 18 total credits as overloaded', async () => {
    await store.writeAll([
      ...SEED_COURSES,
      {
        ...SEED_COURSES[0],
        code: 'AI401',
        credits: 2,
      },
    ]);
    await expect(service.stats()).resolves.toMatchObject({
      totalCredits: 19,
      overloaded: true,
    });
  });

  it('finds a course without regard to code case', async () => {
    await expect(service.findOne({ code: 'cs101' })).resolves.toEqual(SEED_COURSES[0]);
  });

  it('keeps the CS-301L seed course available', async () => {
    await expect(service.findOne({ code: 'CS-301L' })).resolves.toMatchObject({
      code: 'CS-301L',
      title: 'Database Systems',
    });
  });

  it('throws when a course does not exist', async () => {
    await expect(service.findOne({ code: 'CS999' })).rejects.toThrow(NotFoundException);
  });

  it('creates and logs a course, and rejects duplicate codes', async () => {
    const dto = {
      code: 'AI401',
      title: 'Artificial Intelligence',
      department: CourseDepartment.CS,
      credits: 3,
      instructor: 'Dr. Zara',
      capacity: 20,
    };
    expect(await service.create(dto)).toEqual(dto);
    expect(logger.log).toHaveBeenCalledWith('Created course AI401');
    await expect(service.create(dto)).rejects.toThrow(ConflictException);
  });

  it('replaces course details while preserving the URL code', async () => {
    const replaced = await service.replace('CS101', {
      title: 'Programming I',
      department: CourseDepartment.CS,
      credits: 4,
      instructor: 'Dr. Ali',
      capacity: 45,
    });
    expect(replaced).toMatchObject({ code: 'CS101', title: 'Programming I', credits: 4 });
  });

  it('patches only supplied fields', async () => {
    const updated = await service.update('CS101', { capacity: 50 });
    expect(updated).toMatchObject({
      code: 'CS101',
      title: 'Programming Fundamentals',
      capacity: 50,
    });
  });

  it('deletes a course and then returns not found', async () => {
    await service.remove('CS101');
    await expect(service.findOne({ code: 'CS101' })).rejects.toThrow(NotFoundException);
    expect(logger.log).toHaveBeenCalledWith('Deleted course CS101');
  });

  it('returns zero averages for an empty course store', async () => {
    service = new CoursesService(new InMemoryCourseStore(), new CreditService(), logger as AppLogger);
    await expect(service.stats()).resolves.toMatchObject({
      totalCourses: 0,
      totalCredits: 0,
      averageCredits: 0,
    });
  });
});
