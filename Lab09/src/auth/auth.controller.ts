import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import type { AuthRequest } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') register(@Body() dto: RegisterDto) { return this.authService.register(dto); }

  @Post('login') @HttpCode(200)
  login(@Body() dto: LoginDto) { return this.authService.login(dto); }

  @UseGuards(AuthGuard) @Post('change-password') @HttpCode(200)
  changePassword(@Body() dto: ChangePasswordDto, @Req() req: AuthRequest) {
    return this.authService.changePassword(req.user.sub, dto);
  }

  @UseGuards(AuthGuard) @Get('profile')
  profile(@Req() req: AuthRequest) { return req.user; }
}