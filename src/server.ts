import express from 'express';
import qs from 'qs';
import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

import MeetupRouter from './routes/meetup';
import AuthRouter from './routes/auth';
import {
  db, PORT, ACCESS_TOKEN_SECRET,
} from './constants';
import { userQueries } from './db/sql';

const app = express();

const port = PORT || 5000;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: ACCESS_TOKEN_SECRET,
};

passport.use(new JWTStrategy(options, async (jwtPayload, done) => {
  console.log(jwtPayload);
  try {
    const user = await db.oneOrNone(userQueries.getById, { id: jwtPayload.id });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

app.set('query parser', (str: string) => qs.parse(str, { comma: true }));

app.use(express.json());

app.use('/meetup', passport.authenticate('jwt', { session: false }), MeetupRouter);

app.use('/auth', AuthRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
