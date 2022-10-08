export interface CreateMeetupPayload {
  name: string;
  description?: string;
  tags?: Array<string>;
  timestamp: string;
}

export type UpdateMeetupPayload = Partial<CreateMeetupPayload>
