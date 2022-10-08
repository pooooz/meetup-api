import express from 'express';

import MeetupRouter from './routes/meetup';
import { PORT } from './constants';

const app = express();

const port = PORT || 5000;

app.use(express.json());

app.use('/meetup', MeetupRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));
