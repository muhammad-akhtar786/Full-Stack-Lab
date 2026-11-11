import { NextFunction, Request, Response } from 'express';

function clean(value: unknown): unknown {
  if (typeof value === 'string') return value.replace(/[<>]/g, '').trim();
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, clean(v)]));
  }
  return value;
}

export function sanitizeMiddleware(req: Request, _res: Response, next: NextFunction) {
  if (req.body) req.body = clean(req.body);
  next();
}