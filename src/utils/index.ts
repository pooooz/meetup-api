import { CreateMeetupPayload, UpdateMeetupPayload } from '../controllers/meetup/interfaces';

export const generateFormattedTags = (tags: Array<string>) => `'{${tags.map((tag) => `"${tag}"`).join(', ')}}'`;

export const generateInsertValues = (params: CreateMeetupPayload) => ({
  ...{
    name: null,
    description: null,
    tags: null,
    timestamp: null,
  },
  ...params,
});

export const generateUpdateQuery = (id: string, params: UpdateMeetupPayload) => {
  const definedParams = Object.keys(params)
    .filter((key) => params[key as keyof UpdateMeetupPayload]
      || params[key as keyof UpdateMeetupPayload] === null)
    .map((key) => ({ key, value: params[key as keyof UpdateMeetupPayload] }));

  const query = definedParams.map((elem, idx) => {
    if (elem.value === null) {
      return `${elem.key} = ${elem.value}${idx !== definedParams.length - 1 ? ',' : ''}`;
    }
    if (elem.key === 'tags') {
      return `${elem.key} = ${generateFormattedTags(elem?.value as Array<string>)}${idx !== definedParams.length - 1 ? ',' : ''}`;
    }
    return `${elem.key} = '${elem.value}'${idx !== definedParams.length - 1 ? ',' : ''}`;
  }).join(' ');

  return `UPDATE meetups SET ${query} WHERE id = ${id} RETURNING *`;
};
