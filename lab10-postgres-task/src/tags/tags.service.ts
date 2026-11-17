import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity.js';
import { CreateTagDto } from './dto/create-tag.dto.js';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAll() {
    return this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: { notes: true },
    });
    if (!tag) throw new NotFoundException('Tag not found');
    return tag;
  }

  async create(dto: CreateTagDto) {
    const existing = await this.tagRepository.findOneBy({ name: dto.name });
    if (existing) {
      throw new ConflictException(`Tag "${dto.name}" already exists`);
    }
    const tag = this.tagRepository.create(dto);
    return this.tagRepository.save(tag);
  }

  async remove(id: number) {
    const tag = await this.findOne(id);
    await this.tagRepository.remove(tag);
    return { message: 'Tag deleted successfully' };
  }
}
