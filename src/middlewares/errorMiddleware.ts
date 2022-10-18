import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import pgPromise from 'pg-promise';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const { QueryResultError } = pgPromise.errors;

/* eslint no-unused-vars: 0 */
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ValidationError) {
    res.status(400).json(err.details[0]);
    return;
  }

  if (err instanceof QueryResultError) {
    res.status(400).json({ message: err.message, status: 400, code: err.code });
    return;
  }

  if (err instanceof TokenExpiredError) {
    res.status(401).json(err);
    return;
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json(err);
    return;
  }

  const undefinedError = {
    type: err.type || 'error',
    message: err.message || 'An unexpected error has occurred',
    detail: err.detail || 'No details',
  };

  res.status(err.status || 500).json(undefinedError);
};
