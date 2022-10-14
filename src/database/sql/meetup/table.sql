CREATE TABLE meetups (
    id SERIAL PRIMARY KEY,
    name TEXT,
    description TEXT,
    tags TEXT[],
    timestamp TIMESTAMP WITH TIME ZONE,
    creator_id INTEGER REFERENCES users (id)
);