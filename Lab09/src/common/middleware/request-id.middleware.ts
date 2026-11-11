import { randomUUID } from 'crypto';
import { NextFunction, Request, Response } from 'express';

export type RequestWithId = Request & { id?: string };

export function RequestIdMiddleware(req: RequestWithId, res: Response, next: NextFunction) {
  const id = randomUUID();
  req.id = id;
  res.setHeader('X-Request-Id', id);
  res.locals.requestId = id;
  next();
}