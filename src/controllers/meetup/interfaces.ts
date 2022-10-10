export interface CreateMeetupPayload {
  name: string;
  description?: string | null;
  tags?: Array<string> | null;
  timestamp: string;
}

export interface SearchMeetupPayload {
  name?: string,
  description?: string,
  tags?: Array<string> | string,
  timestamp?: string,
  from?: string,
  to?: string,
}

export type UpdateMeetupPayload = Partial<CreateMeetupPayload>
