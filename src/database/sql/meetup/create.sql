INSERT INTO meetups (name, description, tags, timestamp, creator_id)
VALUES (${name}, ${description}, ${tags}, ${timestamp}, ${creator}) RETURNING *
