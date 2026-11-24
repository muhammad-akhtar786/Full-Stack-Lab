import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const suppliedKey = request.headers['x-api-key'];
    const expectedKey = process.env.API_KEY || 'quiz-api-key';
    if (suppliedKey !== expectedKey) throw new UnauthorizedException('Valid x-api-key header required.');
    return true;
  }
}
