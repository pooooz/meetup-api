import Joi from 'joi';

import { CreateMeetupPayload, SearchMeetupPayload, UpdateMeetupPayload } from './interfaces';

export const createMeetupSchema = Joi.object<CreateMeetupPayload>({
  name: Joi.string().required(),
  description: Joi.string().allow(null),
  tags: Joi.array().items(Joi.string()).allow(null),
  timestamp: Joi.string().isoDate().required(),
});

export const updateMeetupSchema = Joi.object<UpdateMeetupPayload>({
  name: Joi.string(),
  description: Joi.string().allow(null),
  tags: Joi.array().items(Joi.string().required()).allow(null),
  timestamp: Joi.string().isoDate(),
});

export const idSchema = Joi.string().pattern(/^\d+$/, 'number');

export const queryObjectSchema = Joi.object<SearchMeetupPayload>({
  name: Joi.string(),
  description: Joi.string(),
  tags: [Joi.array().items(Joi.string().required()), Joi.string()],
  timestamp: Joi.string().isoDate(),
  from: Joi.string().isoDate(),
  to: Joi.string().isoDate(),
});
