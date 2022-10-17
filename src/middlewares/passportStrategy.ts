import { Strategy as JWTStrategy } from 'passport-jwt';
import { Request } from 'express';

import { ACCESS_TOKEN_SECRET } from '../constants';
import { db } from '../database';
import { userQueries } from '../database/sql';
import { UserInfo } from '../shemes/user/interfaces';

const cookieExtractor = (req: Request) => {
  if (req.cookies) {
    return req.cookies.accessToken as string;
  }
  return null;
};

const options = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: ACCESS_TOKEN_SECRET,
};

export const authStrategy = new JWTStrategy(options, async (jwtPayload, done) => {
  try {
    const user = await db.oneOrNone<UserInfo>(userQueries.getById, { id: jwtPayload.id });
    if (user) {
      const { id, name, email } = user;
      return done(null, { id, name, email });
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
