DELETE FROM meetups
WHERE id = ${id} RETURNING *
