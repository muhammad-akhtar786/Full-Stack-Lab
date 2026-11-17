import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './note.entity.js';
import { Category } from '../categories/category.entity.js';
import { User } from '../users/user.entity.js';
import { Tag } from '../tags/tag.entity.js';
import { NotesService } from './notes.service.js';
import { NotesController } from './notes.controller.js';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Category, User, Tag])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
