export interface Note {
  id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  isPinned: boolean;
  createdAt: Date;
  dueDate?: Date;
  tags?: string[];
}
