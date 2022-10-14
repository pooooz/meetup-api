import Joi from 'joi';
import { SearchMeetupPayload } from './interfaces';

const integerGreaterThanZero = /^[1-9]\d*$/;

export const queryObjectSchema = Joi.object<SearchMeetupPayload>({
  name: Joi.string(),
  description: Joi.string(),
  tags: [Joi.array().items(Joi.string().required()), Joi.string()],
  timestamp: Joi.string().isoDate(),
  from: Joi.string().isoDate(),
  to: Joi.string().isoDate(),
  sort: Joi.string().pattern(/id|name|timestamp/, 'id, name, timestamp'),
  limit: Joi.string().pattern(integerGreaterThanZero, 'integer greater than zero'),
  page: Joi.string().pattern(integerGreaterThanZero, 'integer greater than zero'),
});
