import type { Note } from './note.model';

export type SortOption =
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc'
  | 'priority-high'
  | 'priority-low'
  | 'status';

export type FilterStatus = 'all' | Note['status'];
export type FilterPriority = 'all' | Note['priority'];

export interface FilterState {
  search: string;
  sort: SortOption;
  status: FilterStatus;
  priority: FilterPriority;
  showPinnedOnly: boolean;
}
