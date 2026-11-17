import { Transform, Type } from 'class-transformer';
import {
  IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min,
} from 'class-validator';
import { CourseDepartment } from '../course.entity';

export class QueryCourseDto {
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(CourseDepartment)
  department?: CourseDepartment;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(6)
  minCredits?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(6)
  maxCredits?: number;

  @IsOptional()
  @IsIn(['code', 'title', 'credits'])
  sort?: 'code' | 'title' | 'credits';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  limit?: number;
}
