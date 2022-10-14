CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    name TEXT,
    password TEXT,
    refresh_token TEXT
);