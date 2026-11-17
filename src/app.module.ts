import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StudentsModule } from './students/students.module.js';
import { CoursesModule } from './courses/courses.module.js';
import { EnrollmentsModule } from './enrollments/enrollments.module.js';

import { UsersModule } from './users/users.module.js';
import { ProfilesModule } from './profiles/profiles.module.js';
import { NotesModule } from './notes/notes.module.js';
import { TagsModule } from './tags/tags.module.js';
import { CategoriesModule } from './categories/categories.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'superuser',
      database: process.env.DB_DATABASE || 'fullstack_lab10_task',
      autoLoadEntities: true,
      synchronize: true,
    }),
    StudentsModule,
    CoursesModule,
    EnrollmentsModule,
    UsersModule,
    ProfilesModule,
    NotesModule,
    TagsModule,
    CategoriesModule,
  ],
})
export class AppModule {}
