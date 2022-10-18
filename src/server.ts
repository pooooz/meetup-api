import path from 'path';

import express from 'express';
import qs from 'qs';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import MeetupRouter from './routes/meetup';
import AuthRouter from './routes/auth';
import { PORT } from './constants';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { authStrategy } from './middlewares/passportStrategy';

const swaggerDocument = YAML.load(path.resolve(__dirname, '../swagger.yaml'));

const app = express();

const port = PORT || 5000;

app.set('query parser', (str: string) => qs.parse(str, { comma: true }));

app.use(express.json());
app.use(cookieParser());

passport.use(authStrategy);

app.use('/meetup', passport.authenticate('jwt', { session: false }), MeetupRouter);

app.use('/auth', AuthRouter);

app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

app.listen(port, () => console.log(`Server is running on port ${port}`));
