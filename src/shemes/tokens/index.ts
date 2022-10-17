import Joi from 'joi';

import { RefreshTokenPayload } from './interfaces';

export const refreshTokenSchema = Joi.object<RefreshTokenPayload>({
  accessToken: Joi.string(),
  refreshToken: Joi.string().required(),
});
