import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

import { db, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../constants';
import { createUserSchema, refreshTokenSchema } from './schemes';
import { userQueries } from '../../db/sql';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from './constants';
import { CustomJWTPayload } from './interfaces';

class Auth {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, name, password } = await createUserSchema.validateAsync(req.body);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await db.one(userQueries.create, { email, name, password: hashedPassword });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = await createUserSchema.validateAsync(req.body);

      const user = await db.oneOrNone(userQueries.getByEmail, { email });
      if (!user) {
        res.status(400).json({ message: 'Email or password is wrong' });
        return;
      }

      const isMatches = await bcrypt.compare(password, user.password);

      if (!isMatches) {
        res.status(400).json({ message: 'Email or password is wrong' });
        return;
      }

      const { id, name } = user;
      const userData = { id, email, name };

      const accessToken = sign(
        userData,
        ACCESS_TOKEN_SECRET as string,
        { expiresIn: ACCESS_TOKEN_LIFETIME },
      );
      const refreshToken = sign(
        userData,
        REFRESH_TOKEN_SECRET as string,
        { expiresIn: REFRESH_TOKEN_LIFETIME },
      );

      await db.any(userQueries.updateRefreshToken, { id, refreshToken });

      res.status(200)
        .json({
          accessToken, refreshToken, id, name, email,
        });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = await refreshTokenSchema.validateAsync(req.body);

      const dataObject:
        CustomJWTPayload | string = verify(
          refreshToken,
          REFRESH_TOKEN_SECRET as string,
        );

      const { id, name, email } = dataObject as CustomJWTPayload;
      const accessToken = sign(
        { id, name, email },
        ACCESS_TOKEN_SECRET as string,
        { expiresIn: ACCESS_TOKEN_LIFETIME },
      );

      res.status(200).send({ refreshToken, accessToken });
    } catch (error) {
      next(error);
    }
  }
}

export const AuthController = new Auth();
