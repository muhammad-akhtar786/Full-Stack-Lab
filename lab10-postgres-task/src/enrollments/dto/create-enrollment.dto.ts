import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateEnrollmentDto {
  @IsInt()
  @Min(1)
  studentId: number;

  @IsInt()
  @Min(1)
  courseId: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  grade: string;
}
