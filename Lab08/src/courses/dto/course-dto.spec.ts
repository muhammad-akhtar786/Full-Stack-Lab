import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CourseDepartment } from '../course.entity';
import { CodeParamDto } from './code-param.dto';
import { CreateCourseDto } from './create-course.dto';
import { QueryCourseDto } from './query-course.dto';
import { ReplaceCourseDto } from './replace-course.dto';
import { UpdateCourseDto } from './update-course.dto';

describe('Course DTOs', () => {
  const validCourse = {
    code: ' cs101 ',
    title: ' Programming Fundamentals ',
    department: CourseDepartment.CS,
    credits: '3',
    instructor: ' Dr. Ali ',
    capacity: '40',
  };

  it('normalizes course code and trims text fields', async () => {
    const dto = plainToInstance(CreateCourseDto, validCourse);
    expect(await validate(dto)).toHaveLength(0);
    expect(dto.code).toBe('CS101');
    expect(dto.title).toBe('Programming Fundamentals');
    expect(dto.credits).toBe(3);
  });

  it('rejects an invalid course code', async () => {
    const dto = plainToInstance(CreateCourseDto, { ...validCourse, code: 'BAD' });
    expect((await validate(dto)).some((error) => error.property === 'code')).toBe(true);
  });

  it('rejects a course with an unsupported department', async () => {
    const dto = plainToInstance(CreateCourseDto, { ...validCourse, department: 'Physics' });
    expect((await validate(dto)).some((error) => error.property === 'department')).toBe(true);
  });

  it('rejects credits outside the accepted integer range', async () => {
    const dto = plainToInstance(CreateCourseDto, { ...validCourse, credits: '0' });
    expect((await validate(dto)).some((error) => error.property === 'credits')).toBe(true);
  });

  it('requires every replacement field except the URL code', async () => {
    const dto = plainToInstance(ReplaceCourseDto, { title: 'Replacement' });
    const errors = await validate(dto);
    expect(errors.map((error) => error.property)).toEqual(
      expect.arrayContaining(['department', 'credits', 'instructor', 'capacity']),
    );
  });

  it('allows a partial update containing only one valid field', async () => {
    const dto = plainToInstance(UpdateCourseDto, { capacity: '45' });
    expect(await validate(dto)).toHaveLength(0);
    expect(dto.capacity).toBe(45);
  });

  it('transforms and validates query numeric fields', async () => {
    const dto = plainToInstance(QueryCourseDto, { minCredits: '3', limit: '4' });
    expect(await validate(dto)).toHaveLength(0);
    expect(dto.minCredits).toBe(3);
    expect(dto.limit).toBe(4);
  });

  it('rejects an unsupported query sort field', async () => {
    const dto = plainToInstance(QueryCourseDto, { sort: 'instructor' });
    expect((await validate(dto)).some((error) => error.property === 'sort')).toBe(true);
  });

  it('normalizes route code parameters', async () => {
    const dto = plainToInstance(CodeParamDto, { code: ' cs202 ' });
    expect(await validate(dto)).toHaveLength(0);
    expect(dto.code).toBe('CS202');
  });

  it('accepts the CS-301L course code', async () => {
    const dto = plainToInstance(CodeParamDto, { code: 'cs-301l' });
    expect(await validate(dto)).toHaveLength(0);
    expect(dto.code).toBe('CS-301L');
  });

  it('rejects malformed route code parameters', async () => {
    const dto = plainToInstance(CodeParamDto, { code: 'CS-2' });
    expect((await validate(dto)).some((error) => error.property === 'code')).toBe(true);
  });
});
