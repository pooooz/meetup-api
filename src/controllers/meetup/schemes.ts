import Joi from 'joi';

import {
  CreateMeetupPayload, SearchMeetupParams, SearchMeetupPayload, UpdateMeetupPayload,
} from './interfaces';

const nonNegativeIntegerPattern = /^\d+$/;
const integerGreaterThanZero = /^[1-9]\d*$/;

export const createMeetupSchema = Joi.object<CreateMeetupPayload>({
  name: Joi.string().required(),
  description: Joi.string().allow(null),
  tags: Joi.array().items(Joi.string().required()).allow(null),
  timestamp: Joi.string().isoDate().required(),
});

export const updateMeetupSchema = Joi.object<UpdateMeetupPayload>({
  name: Joi.string(),
  description: Joi.string().allow(null),
  tags: Joi.array().items(Joi.string().required()).allow(null),
  timestamp: Joi.string().isoDate(),
});

export const idSchema = Joi.object<SearchMeetupParams>({
  id: Joi.string().pattern(nonNegativeIntegerPattern, 'non-negative integer'),
});

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
