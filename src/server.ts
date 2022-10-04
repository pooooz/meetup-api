import express from 'express';

import { PORT } from './constants';

const app = express();

const port = PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello there!');
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
