export interface CreateMeetupPayload {
  name: string;
  description?: string | null;
  tags?: Array<string> | null;
  timestamp: string;
}

export interface SearchMeetupParams {
  id: string;
}

export interface MeetupInfo {
  id: number;
  name: string;
  description: string | null;
  tags: Array<string> | null;
  timestamp: string;
  creator_id: number;
}

export type UpdateMeetupPayload = Partial<CreateMeetupPayload>
