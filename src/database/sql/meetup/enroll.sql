UPDATE meetups
SET participants = array_append(participants, ${userId})
WHERE id = ${id} AND
NOT ${userId} = ANY(participants)
RETURNING *;