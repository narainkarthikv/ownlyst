/**
 * Backward-compatible enum exports for note model consumers.
 */

import {
  PRIORITY_VALUES,
  PRIORITY_LABELS,
  PRIORITY_ORDER,
  PRIORITY_DESCRIPTIONS,
} from '../constants/priorities';
import { STATUS_VALUES, STATUS_LABELS } from '../constants/statuses';
import type { NotePriority, NoteStatus } from './note.model';

/** Values used for form options and validation. */
export const NOTE_PRIORITIES: ReadonlyArray<NotePriority> = PRIORITY_VALUES;
export { PRIORITY_LABELS };
export { PRIORITY_ORDER, PRIORITY_DESCRIPTIONS };
export const NOTE_STATUSES: ReadonlyArray<NoteStatus> = STATUS_VALUES;
export { STATUS_LABELS };
