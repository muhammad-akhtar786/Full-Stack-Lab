
import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { StudentsModule } from './students/students.module';
import { HonorRollModule } from './honor-roll/honor-roll.module';
import {
  DepartmentsController,
  DEPARTMENTS,
} from './departments/departments.controller';
import { Department } from './students/student.entity';
import { CoursesModule } from './courses/courses.module';
import { FeesModule } from './fees/fees.module';

@Module({
  imports: [CoreModule, StudentsModule, HonorRollModule, CoursesModule, FeesModule],
  controllers: [DepartmentsController],
  providers: [
    {
      provide: DEPARTMENTS,
      useValue: Object.values(Department),
    },
  ],
})
export class AppModule {}
