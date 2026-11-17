import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Note } from './note.entity.js';
import { Category } from '../categories/category.entity.js';
import { User } from '../users/user.entity.js';
import { Tag } from '../tags/tag.entity.js';
import { CreateNoteDto } from './dto/create-note.dto.js';
import { UpdateNoteDto } from './dto/update-note.dto.js';
import { QueryNotesDto } from './dto/query-notes.dto.js';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(dto: CreateNoteDto): Promise<Note> {
    let category: Category | null = null;
    if (dto.categoryId !== undefined && dto.categoryId !== null) {
      category = await this.categoryRepository.findOneBy({
        id: dto.categoryId,
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${dto.categoryId} not found`,
        );
      }
    }

    let user: User | null = null;
    if (dto.userId) {
      user = await this.userRepository.findOneBy({ id: dto.userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${dto.userId} not found`);
      }
    }

    let tags: Tag[] = [];
    if (dto.tagIds && dto.tagIds.length > 0) {
      tags = await this.tagRepository.findBy({ id: In(dto.tagIds) });
    }

    const note = this.noteRepository.create({
      title: dto.title,
      content: dto.content,
      category,
      user,
      tags,
    });

    const saved = await this.noteRepository.save(note);
    return this.findOneRaw((saved as Note).id);
  }

  async findAll(query: QueryNotesDto) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 5;
    const skip = (page - 1) * limit;

    const qb = this.noteRepository
      .createQueryBuilder('note')
      .leftJoinAndSelect('note.category', 'category')
      .leftJoinAndSelect('note.user', 'user')
      .leftJoinAndSelect('note.tags', 'tag');

    if (query.search) {
      qb.andWhere('(note.title ILIKE :search OR note.content ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    if (query.categoryId !== undefined) {
      qb.andWhere('note.categoryId = :categoryId', {
        categoryId: query.categoryId,
      });
    }

    if (query.tag) {
      qb.andWhere(
        'note.id IN (SELECT nt."noteId" FROM note_tags nt INNER JOIN tags t ON t.id = nt."tagId" WHERE t.name = :tagName)',
        { tagName: query.tag },
      );
    }

    qb.orderBy('note.isPinned', 'DESC')
      .addOrderBy('note.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: {
        category: true,
        user: true,
        tags: true,
      },
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    await this.noteRepository.increment({ id }, 'views', 1);
    note.views += 1;

    return note;
  }

  private async findOneRaw(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: {
        category: true,
        user: true,
        tags: true,
      },
    });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: number, dto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    if (dto.categoryId !== undefined) {
      if (dto.categoryId === null) {
        note.category = null;
      } else {
        const category = await this.categoryRepository.findOneBy({
          id: dto.categoryId,
        });
        if (!category) {
          throw new NotFoundException(
            `Category with ID ${dto.categoryId} not found`,
          );
        }
        note.category = category;
      }
    }

    if (dto.title !== undefined) {
      note.title = dto.title;
    }
    if (dto.content !== undefined) {
      note.content = dto.content;
    }
    if (dto.isPinned !== undefined) {
      note.isPinned = dto.isPinned;
    }

    await this.noteRepository.save(note);
    return this.findOneRaw(id);
  }

  async remove(id: number): Promise<{ message: string }> {
    const note = await this.noteRepository.findOneBy({ id });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    await this.noteRepository.remove(note);
    return { message: 'Note deleted successfully' };
  }
}
