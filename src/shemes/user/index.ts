import Joi from 'joi';

import { CreateUserPayload, LoginUserPayload } from './interfaces';

const usernamePattern = /^[A-Za-z]\w{2,29}$/;

export const createUserSchema = Joi.object<CreateUserPayload>({
  email: Joi.string().email().required(),
  name: Joi.string().pattern(usernamePattern, 'username'),
  password: Joi.string().required(),
});

export const loginUserSchema = Joi.object<LoginUserPayload>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
