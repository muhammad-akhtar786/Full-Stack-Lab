import { Module } from '@nestjs/common';
import { AppLogger } from '../common/logger/app-logger';
import { APP_CONFIG, AppConfig } from '../core/app-config';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CreditService } from './credit.service';
import { SEED_COURSES } from './courses.seed';
import {
  COURSE_STORE, CourseStore, InMemoryCourseStore, JsonFileCourseStore,
} from './store/course-store';

@Module({
  controllers: [CoursesController],
  providers: [
    CoursesService,
    CreditService,
    {
      provide: COURSE_STORE,
      useFactory: (config: AppConfig, logger: AppLogger): CourseStore => {
        logger.log(`Using ${config.storage} course storage`);
        return config.storage === 'memory'
          ? new InMemoryCourseStore(SEED_COURSES)
          : new JsonFileCourseStore(config.coursesFile);
      },
      inject: [APP_CONFIG, AppLogger],
    },
  ],
  exports: [CoursesService],
})
export class CoursesModule {}
