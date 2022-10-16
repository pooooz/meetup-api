CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    tags TEXT[],
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    creator_id INTEGER REFERENCES users (id) NOT NULL,
    participants INTEGER[] NOT NULL,
);