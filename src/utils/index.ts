import { CreateMeetupPayload, UpdateMeetupPayload } from '../shemes/meetup/interfaces';
import { SearchMeetupPayload } from '../shemes/queries/interfaces';

export const generateFormattedArray = (elements: Array<string | number>) => `'{${elements.map((element) => (typeof element === 'string' ? `"${element}"` : `${element}`)).join(', ')}}'`;

export const generateInsertValues = (params: CreateMeetupPayload, userId: number) => ({
  ...{
    name: null,
    description: null,
    tags: null,
    timestamp: null,
    creator: userId,
    participants: `{${userId}}`,
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
    if (elem.key === 'participants') {
      return `${elem.key} = ${generateFormattedArray([...new Set(elem?.value as Array<number>)] as Array<number>)}${idx !== definedParams.length - 1 ? ',' : ''}`;
    }
    if (elem.key === 'tags') {
      return `${elem.key} = ${generateFormattedArray(elem?.value as Array<string>)}${idx !== definedParams.length - 1 ? ',' : ''}`;
    }
    return `${elem.key} = '${elem.value}'${idx !== definedParams.length - 1 ? ',' : ''}`;
  }).join(' ');

  return `UPDATE meetups SET ${query} WHERE id = ${id} RETURNING *`;
};

export const generateSearchQuery = (queries: SearchMeetupPayload) => {
  const {
    name, description, tags, timestamp, from, to, sort, limit, page,
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

  if (sqlParams && (from || to)) {
    sqlParams += ' AND ';
  }
  if (from && !to) {
    sqlParams += `timestamp > '${from}'`;
  }
  if (!from && to) {
    sqlParams += `timestamp < '${to}'`;
  }
  if (from && to) {
    sqlParams += `timestamp BETWEEN '${from}' AND '${to}'`;
  }

  if (sqlParams) {
    sqlParams = `WHERE ${sqlParams}`;
  }

  if (sort) {
    sqlParams += `ORDER BY ${sort} `;
  }

  if (page && limit) {
    sqlParams += `OFFSET ${Number(limit) * (Number(page) - 1)} LIMIT ${limit}`;
  }

  return `SELECT * FROM meetups ${sqlParams};`;
};

export const generateElementsCountQuery = (queries: SearchMeetupPayload) => {
  const {
    page, limit, sort, ...restParams
  } = queries;
  return `SELECT COUNT(id) ${generateSearchQuery(restParams).slice(9)}`;
};

export const convertLifetimeStringToMilliseconds = (lifetime: string) => {
  if (/m$/.test(lifetime)) {
    return Number(lifetime.slice(0, -1)) * 60 * 1000;
  }

  if (/d$/.test(lifetime)) {
    return Number(lifetime.slice(0, -1)) * 24 * 3600 * 1000;
  }

  return 0;
};
