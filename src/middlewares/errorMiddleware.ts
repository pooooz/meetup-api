import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import pgPromise from 'pg-promise';

const { QueryResultError } = pgPromise.errors;

/* eslint no-unused-vars: 0 */
export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(400).json(err.details[0]);
    return;
  }

  if (err instanceof QueryResultError) {
    res.status(400).json({ message: err.message, status: 400, code: err.code });
    return;
  }

  const undefinedError = {
    type: err.type || 'error',
    message: err.message || 'An unexpected error has occurred',
  };

  res.status(err.status || 500).json(undefinedError);
};
