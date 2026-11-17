import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
import { Profile } from '../profiles/profile.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export interface UserStats {
  userId: number;
  name: string;
  totalNotes: number;
  pinnedNotes: number;
  totalViews: number;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  findAll() {
    return this.userRepository.find({
      relations: { profile: true, notes: true },
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true, notes: true },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async create(dto: CreateUserDto) {
    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
    });

    if (dto.bio) {
      const profile = this.profileRepository.create({ bio: dto.bio });
      user.profile = profile;
    }

    return this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (dto.name) user.name = dto.name;
    if (dto.email) user.email = dto.email;
    if (dto.bio !== undefined) {
      if (user.profile) {
        user.profile.bio = dto.bio;
      } else {
        user.profile = this.profileRepository.create({ bio: dto.bio, user });
      }
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
    return { message: 'User deleted successfully' };
  }

  async getUserStats(id: number): Promise<UserStats> {
    const userExists = await this.userRepository.findOneBy({ id });
    if (!userExists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const raw = await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.notes', 'note')
      .select('user.id', 'userId')
      .addSelect('user.name', 'name')
      .addSelect('COUNT(note.id)', 'totalNotes')
      .addSelect('COALESCE(SUM(note.views), 0)', 'totalViews')
      .addSelect(
        'COUNT(*) FILTER (WHERE note."isPinned" = true)',
        'pinnedNotes',
      )
      .where('user.id = :id', { id })
      .groupBy('user.id')
      .addGroupBy('user.name')
      .getRawOne();

    return {
      userId: Number(raw.userId),
      name: String(raw.name),
      totalNotes: Number(raw.totalNotes),
      pinnedNotes: Number(raw.pinnedNotes),
      totalViews: Number(raw.totalViews),
    };
  }
}
