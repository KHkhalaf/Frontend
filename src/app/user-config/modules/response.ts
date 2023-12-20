import { support } from './support';
import { User } from './user';

export interface response {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: object;
  support: support;
}
