
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  IsOptional,
  Matches,
  Max,
  Min,
  MinLength,
} from 'class-validator';

import { Department } from '../student.entity';

const trim = ({ value }: { value: any }) =>
  typeof value === 'string' ? value.trim() : value;

const trimUpper = ({ value }: { value: any }) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

const trimLower = ({ value }: { value: any }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class CreateStudentDto {
  @Transform(trim)
  @IsString()
  @MinLength(3, { message: 'name must be at least 3 characters' })
  name: string;

  @Transform(trimUpper)
  @Matches(/^BSCS-\d{3}$/, {
    message: 'rollNumber must look like BSCS-001',
  })
  rollNumber: string;

  @Transform(trimLower)
  @IsEmail({}, { message: 'email must be a valid email address' })
  email: string;

  @IsEnum(Department, {
    message: `department must be one of: ${Object.values(Department).join(', ')}`,
  })
  department: Department;

  @IsInt({ message: 'semester must be a whole number' })
  @Min(1, { message: 'semester must be at least 1' })
  @Max(8, { message: 'semester must be at most 8' })
  semester: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'cgpa must be a number with at most 2 decimals' },
  )
  @Min(0, { message: 'cgpa must not be less than 0' })
  @Max(4, { message: 'cgpa must not be greater than 4' })
  cgpa: number;

  // Optional Pakistani mobile number
  @IsOptional()
  @Transform(({ value }: { value: any }) =>
    typeof value === 'string'
      ? value.replace(/[-\s]/g, '')
      : value,
  )
  @Matches(/^03\d{9}$/, {
    message: 'phone must look like 03001234567',
  })
  phone?: string;
}
