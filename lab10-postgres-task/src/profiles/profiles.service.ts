import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  findAll() {
    return this.profileRepository.find({ relations: { user: true } });
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id },
      relations: { user: true },
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async update(id: number, dto: UpdateProfileDto) {
    const profile = await this.findOne(id);
    if (dto.bio !== undefined) profile.bio = dto.bio;
    return this.profileRepository.save(profile);
  }
}
