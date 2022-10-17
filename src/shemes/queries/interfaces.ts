export interface SearchMeetupPayload {
  name?: string,
  description?: string,
  tags?: Array<string> | string,
  timestamp?: string,
  from?: string,
  to?: string,
  sort?: 'id' | 'name' | 'timestamp',
  limit?: string;
  page?: string;
}
