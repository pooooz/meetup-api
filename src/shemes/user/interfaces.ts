export interface CreateUserPayload {
  email: string;
  name: string;
  password: string;
}

export interface UserInfo {
  id: number;
  email: string;
  name: string;
  password: string;
  refresh_token: string | null;
}
