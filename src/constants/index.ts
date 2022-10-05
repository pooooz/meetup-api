import 'dotenv/config';
import pgPromise from 'pg-promise';

export const { PORT } = process.env;

const USER = process.env.POSTGRES_USER;
const PASSWORD = process.env.POSTGRES_PASSWORD;
const NAME = process.env.POSTGRES_DATABASE;

const pgp = pgPromise();

const connectionString = `postgresql://${USER}:${PASSWORD}@localhost:${PORT}/${NAME}`;

export const db = pgp(connectionString);
