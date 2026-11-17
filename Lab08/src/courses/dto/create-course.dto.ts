import { Transform, Type } from 'class-transformer';
import {
  IsEnum, IsInt, IsString, Matches, Max, Min, MinLength,
} from 'class-validator';
import { CourseDepartment } from '../course.entity';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

const normalizedCode = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class CreateCourseDto {
  @Transform(normalizedCode)
  @Matches(/^(?:[A-Z]{2,4}\d{3,4}|CS-\d{3}L)$/, {
    message: 'code must be 2-4 letters followed by 3-4 digits or CS-###L',
  })
  code: string;

  @Transform(trim)
  @IsString()
  @MinLength(3)
  title: string;

  @IsEnum(CourseDepartment)
  department: CourseDepartment;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(6)
  credits: number;

  @Transform(trim)
  @IsString()
  @MinLength(2)
  instructor: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  capacity: number;
}
