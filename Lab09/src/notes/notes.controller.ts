import { Body, Controller, Delete, ForbiddenException, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { PositiveIntPipe } from '../common/pipes/positive-int.pipe';
import { SortOrderPipe } from '../common/pipes/sort-order.pipe';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesService } from './notes.service';
import type { AuthRequest } from '../auth/auth.types';

@Controller('notes')
@UseGuards(AuthGuard, RolesGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() dto: CreateNoteDto, @Req() req: AuthRequest) {
    return this.notesService.create(req.user.sub, dto);
  }

  @Get()
  findMine(@Req() req: AuthRequest, @Query('order', SortOrderPipe) order: 'asc' | 'desc') {
    return this.notesService.findAllByOwner(req.user.sub, order);
  }

  @Get(':id')
  findOne(@Param('id', PositiveIntPipe) id: number, @Req() req: AuthRequest) {
    const note = this.notesService.findOne(id);
    if (note.ownerId !== req.user.sub && req.user.role !== 'admin') {
      throw new ForbiddenException('You can only read your own notes');
    }
    return note;
  }

  @Patch(':id')
  update(@Param('id', PositiveIntPipe) id: number, @Body() dto: UpdateNoteDto, @Req() req: AuthRequest) {
    const note = this.notesService.findOne(id);
    if (note.ownerId !== req.user.sub && req.user.role !== 'admin') {
      throw new ForbiddenException('You can only update your own notes');
    }
    return this.notesService.update(id, dto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id', PositiveIntPipe) id: number) {
    return this.notesService.remove(id);
  }
}