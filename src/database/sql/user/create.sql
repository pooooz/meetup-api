INSERT INTO users (email, name, password, refresh_token)
VALUES (${email}, ${name}, ${password}, null) RETURNING *