import 'dotenv/config';
import pgPromise from 'pg-promise';

const USER = process.env.POSTGRES_USER;
const PASSWORD = process.env.POSTGRES_PASSWORD;
const NAME = process.env.POSTGRES_DATABASE;
const DATABASE_PORT = process.env.POSTGRES_PORT;

const pgp = pgPromise();

const connectionString = `postgresql://${USER}:${PASSWORD}@${process.env.NODE_ENV === 'production' ? 'postgres' : 'localhost'}:${DATABASE_PORT}/${NAME}`;

export const db = pgp(connectionString);
