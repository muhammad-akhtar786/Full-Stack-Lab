import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export type Role = 'user' | 'admin';
export interface User {
  id: number; name: string; email: string; passwordHash: string; role: Role;
}

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];
  private nextId = 1;

  async onModuleInit() {
    if (!this.findByEmail('admin@lab.com')) {
      await this.create('Lab Admin', 'admin@lab.com', 'Admin@1234', 'admin');
    }
  }

  async create(name: string, email: string, password: string, role: Role = 'user') {
    const passwordHash = await bcrypt.hash(password, 10);
    const user: User = { id: this.nextId++, name, email: email.toLowerCase(), passwordHash, role };
    this.users.push(user);
    return user;
  }

  findByEmail(email: string) { return this.users.find(u => u.email === email.toLowerCase()); }
  findById(id: number) { return this.users.find(u => u.id === id); }

  async updatePassword(id: number, newPassword: string) {
    const user = this.findById(id);
    if (!user) return undefined;
    user.passwordHash = await bcrypt.hash(newPassword, 10);
    return user;
  }

  findAllSafe() {
    return this.users.map(({ id, name, email, role }) => ({ id, name, email, role }));
  }
}