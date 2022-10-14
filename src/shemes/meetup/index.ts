import Joi from 'joi';

import { CreateMeetupPayload, SearchMeetupParams, UpdateMeetupPayload } from './interfaces';

const nonNegativeIntegerPattern = /^\d+$/;

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
