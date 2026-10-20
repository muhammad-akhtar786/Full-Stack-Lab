import { PartialType } from '@nestjs/mapped-types';
import { ReplaceCourseDto } from './replace-course.dto';

export class UpdateCourseDto extends PartialType(ReplaceCourseDto) {}
