import { join } from 'path';

export interface AppConfig {
  appName: string;
  port: number;
  storage: 'memory' | 'file';
  dataFile: string;
  coursesFile: string;
}

export const APP_CONFIG = Symbol('APP_CONFIG');

export const appConfig: AppConfig = {
  appName: 'Lab 08 NestJS API',
  port: Number(process.env.PORT) || 3000,
  storage: process.env.STORAGE === 'memory' ? 'memory' : 'file',
  dataFile: join(process.cwd(), 'data', 'students.json'),
  coursesFile: join(process.cwd(), 'data', 'courses.json'),
};
