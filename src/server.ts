import express from 'express';
import qs from 'qs';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import MeetupRouter from './routes/meetup';
import AuthRouter from './routes/auth';
import { PORT } from './constants';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { authStrategy } from './middlewares/passportStrategy';

const app = express();

const port = PORT || 5000;

app.set('query parser', (str: string) => qs.parse(str, { comma: true }));

app.use(express.json());
app.use(cookieParser());

passport.use(authStrategy);

app.use('/meetup', passport.authenticate('jwt', { session: false }), MeetupRouter);

app.use('/auth', AuthRouter);

app.use(errorMiddleware);

app.listen(port, () => console.log(`Server is running on port ${port}`));
