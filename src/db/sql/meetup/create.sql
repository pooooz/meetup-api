INSERT INTO meetups (name, description, tags, timestamp)
VALUES (${name}, ${description}, ${tags}, ${timestamp}) RETURNING *
