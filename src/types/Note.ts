export interface Note {
  id: string;
  title: string;
  content: string;
  color: 'indigo' | 'emerald' | 'sky' | 'rose' | 'violet' | 'amber' | 'fuchsia' | 'slate' | 'cyan' | 'lime' | 'orange' | 'teal';
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'done';
  isPinned: boolean;
  createdAt: Date;
  dueDate?: Date;
  tags?: string[];
}