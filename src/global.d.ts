import { JwtPayload } from 'jsonwebtoken';

declare global {
  export interface CustomJWTPayload extends JwtPayload {
    id?: number;
    name?: string;
    email?: string;
  }
}

declare global {
  namespace Express {
    interface User {
      id: number;
      email: string;
      name: string;
    }
  }
}
