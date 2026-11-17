import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

export interface Note { id: number; ownerId: number; title: string; content: string; tags?: string[]; }

@Injectable()
export class NotesService {
  private notes: Note[] = [];
  private nextId = 1;

  create(ownerId: number, dto: CreateNoteDto): Note {
    const note: Note = { id: this.nextId++, ownerId, title: dto.title, content: dto.content, tags: dto.tags ?? [] };
    this.notes.push(note);
    return note;
  }

  findAllByOwner(ownerId: number, order: 'asc' | 'desc' = 'asc'): Note[] {
    return this.notes.filter(n => n.ownerId === ownerId)
      .sort((a, b) => order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title));
  }

  findOne(id: number): Note {
    const note = this.notes.find(n => n.id === id);
    if (!note) throw new NotFoundException(`Note ${id} not found`);
    return note;
  }

  update(id: number, dto: UpdateNoteDto): Note {
    const note = this.findOne(id);
    Object.assign(note, dto);
    return note;
  }

  remove(id: number): Note {
    const note = this.findOne(id);
    this.notes = this.notes.filter(n => n.id !== id);
    return note;
  }
}