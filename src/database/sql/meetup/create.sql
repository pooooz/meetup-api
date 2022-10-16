INSERT INTO meetups (name, description, tags, timestamp, creator_id, participants)
VALUES (${name}, ${description}, ${tags}, ${timestamp}, ${creator}, ${participants}) RETURNING *
