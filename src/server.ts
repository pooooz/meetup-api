import express from 'express';
import qs from 'qs';

import MeetupRouter from './routes/meetup';
import { PORT } from './constants';

const app = express();

const port = PORT || 5000;

app.set('query parser', (str: string) => qs.parse(str, { comma: true }));

app.use(express.json());

app.use('/meetup', MeetupRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
