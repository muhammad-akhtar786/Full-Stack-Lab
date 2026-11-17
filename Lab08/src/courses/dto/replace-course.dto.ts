import { OmitType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';

export class ReplaceCourseDto extends OmitType(CreateCourseDto, ['code'] as const) {}
