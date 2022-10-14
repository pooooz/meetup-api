import Joi from 'joi';

import { CreateUserPayload, RefreshTokenPayload } from './interfaces';

const usernamePattern = /^[A-Za-z]\w{2,29}$/;

export const createUserSchema = Joi.object<CreateUserPayload>({
  email: Joi.string().email().required(),
  name: Joi.string().pattern(usernamePattern, 'username').required(),
  password: Joi.string().required(),
});

export const refreshTokenSchema = Joi.object<RefreshTokenPayload>({
  refreshToken: Joi.string().required(),
});