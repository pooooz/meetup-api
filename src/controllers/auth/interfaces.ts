import { JwtPayload } from 'jsonwebtoken';

export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface CustomJWTPayload extends JwtPayload{
  id?: number;
  name?: string;
  email?: string;
}

export interface UserSchema {
  id: number;
  email: string;
  name: string;
  password: string;
  refresh_token: string | null;
}
