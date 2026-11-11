import type { Request } from 'express';
import type { Role } from '../users/users.service';

export interface JwtPayload { sub: number; email: string; role: Role; }
export interface AuthRequest extends Request { user: JwtPayload; }