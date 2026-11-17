import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();
    if (this.usersService.findByEmail(email)) throw new ConflictException('Email is already registered');
    const user = await this.usersService.create(dto.name, email, dto.password);
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  }

  async login(dto: LoginDto) {
    const user = this.usersService.findByEmail(dto.email);
    const valid = user && await bcrypt.compare(dto.password, user.passwordHash);
    if (!user || !valid) throw new UnauthorizedException('Invalid email or password');
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = this.usersService.findById(userId);
    if (!user || !(await bcrypt.compare(dto.currentPassword, user.passwordHash))) {
      throw new UnauthorizedException('Invalid current password');
    }
    if (dto.currentPassword === dto.newPassword) {
      throw new BadRequestException('newPassword must be different from currentPassword');
    }
    await this.usersService.updatePassword(userId, dto.newPassword);
    return { message: 'Password updated' };
  }
}