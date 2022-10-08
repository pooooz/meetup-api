import Joi from 'joi';

import { CreateMeetupPayload, UpdateMeetupPayload } from './interfaces';

export const createMeetupSchema = Joi.object<CreateMeetupPayload>({
  name: Joi.string().required(),
  description: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  timestamp: Joi.string().isoDate().required(),
});

export const updateMeetupSchema = Joi.object<UpdateMeetupPayload>({
  name: Joi.string(),
  description: Joi.string(),
  tags: Joi.array().items(Joi.string().required()),
  timestamp: Joi.string().isoDate(),
});

export const idSchema = Joi.string().pattern(/^\d+$/, 'number');
