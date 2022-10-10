import { CreateMeetupPayload, SearchMeetupPayload, UpdateMeetupPayload } from '../controllers/meetup/interfaces';

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

const getDefinedParams = <ParamsType extends {}>(params: ParamsType) => Object.keys(params)
  .filter((key) => params[key as keyof ParamsType]
      || params[key as keyof ParamsType] === null)
  .map((key) => ({ key, value: params[key as keyof ParamsType] }));

export const generateUpdateQuery = (id: string, params: UpdateMeetupPayload) => {
  const definedParams = getDefinedParams(params);

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

export const generateSearchQuery = (queries: SearchMeetupPayload) => {
  const {
    name, description, tags, timestamp,
  } = queries;
  const paramsToMap = getDefinedParams({
    name, description, tags, timestamp,
  });

  let sqlParams = paramsToMap.map((elem) => {
    if (elem.key === 'tags') {
      if (typeof elem.value === 'string') {
        return `'${elem.value}' = ANY(${elem.key})`;
      }
      if (typeof elem.value === 'object') {
        return elem.value.map((tag) => `'${tag}' = ANY(tags)`).join(' AND ');
      }
    }
    return `${elem.key} = '${elem.value}'`;
  }).join(' AND ');

  if (sqlParams && (queries.from || queries.to)) {
    sqlParams += ' AND ';
  }
  if (queries.from && !queries.to) {
    sqlParams += `timestamp > '${queries.from}'`;
  }
  if (!queries.from && queries.to) {
    sqlParams += `timestamp < '${queries.to}'`;
  }
  if (queries.from && queries.to) {
    sqlParams += `timestamp BETWEEN '${queries.from}' AND '${queries.to}'`;
  }

  return `SELECT * FROM meetups WHERE ${sqlParams};`;
};
