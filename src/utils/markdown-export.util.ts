import type { Note } from '../models/note.model';

/**
 * Utility to convert Note objects to formatted Markdown.
 */
export class MarkdownUtil {
  /**
   * Generates a single note Markdown string with YAML frontmatter.
   */
  static generateSingleNote(note: Note): string {
    const createdDate = note.createdAt instanceof Date ? note.createdAt.toISOString().split('T')[0] : String(note.createdAt);
    const updatedDate = createdDate;

    let frontmatter = `---\ntitle: ${note.title}\nstatus: ${note.status}\npriority: ${note.priority}\ncreated: ${createdDate}\nupdated: ${updatedDate}\n`;
    if (note.tags && note.tags.length > 0) {
      frontmatter += `tags: [${note.tags.join(', ')}]\n`;
    }
    frontmatter += `---\n\n`;

    const content = note.content || '';
    return `${frontmatter}# ${note.title}\n\n${content}`;
  }

  /**
   * Generates a bulk export formatted Markdown containing multiple notes.
   */
  static generateBulkExport(notes: Note[]): string {
    let output = `# Notes Export\n\n`;

    // Group by status
    const statusGroups: Record<string, Note[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    notes.forEach((note) => {
      if (statusGroups[note.status]) {
        statusGroups[note.status].push(note);
      } else {
        statusGroups[note.status] = [note];
      }
    });

    const statusLabels: Record<string, string> = {
      todo: 'To Do',
      in_progress: 'In Progress',
      done: 'Done',
    };

    // Table of contents grouped by status
    Object.keys(statusGroups).forEach((status) => {
      const groupNotes = statusGroups[status];
      if (groupNotes.length === 0) return;

      const label = statusLabels[status] || status;
      output += `## ${label}\n`;
      groupNotes.forEach((note) => {
        const anchor = note.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        output += `- [${note.title}](#${anchor})\n`;
      });
      output += `\n`;
    });

    output += `---\n\n`;

    // Actual note contents
    notes.forEach((note) => {
      output += `## ${note.title}\n`;
      output += `**Status:** ${note.status} | **Priority:** ${note.priority}\n\n`;
      output += `${note.content || 'No content'}\n\n`;
      output += `---\n\n`;
    });

    return output;
  }

  /**
   * Parses a single Markdown string into a Note-like object.
   * Extracts YAML frontmatter for metadata.
   */
  static parseSingleNote(markdown: string): Partial<Note> {
    const note: Partial<Note> = {};
    let content = markdown;

    // Regex to match YAML frontmatter
    const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
    const match = markdown.match(frontmatterRegex);

    if (match) {
      const frontmatterStr = match[1];
      content = markdown.slice(match[0].length);

      const lines = frontmatterStr.split(/\r?\n/);
      for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const key = line.slice(0, colonIndex).trim();
          let value = line.slice(colonIndex + 1).trim();

          if (key === 'title') note.title = value;
          else if (key === 'status') note.status = value as Note['status'];
          else if (key === 'priority') note.priority = value as Note['priority'];
          else if (key === 'created') note.createdAt = new Date(value);
          else if (key === 'tags') {
            if (value.startsWith('[') && value.endsWith(']')) {
              value = value.slice(1, -1);
            }
            note.tags = value.split(',').map((t) => t.trim()).filter(Boolean);
          }
        }
      }
    }

    // Attempt to extract title from first H1 if not in frontmatter
    if (!note.title) {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        note.title = titleMatch[1].trim();
        // Remove title from content
        content = content.replace(titleMatch[0], '').trim();
      } else {
        note.title = 'Imported Note';
      }
    } else {
      // If title is in frontmatter, we might still want to remove the redundant H1 from the top
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (titleMatch && titleMatch[1].trim() === note.title) {
        content = content.replace(titleMatch[0], '').trim();
      }
    }

    note.content = content.trim();

    return note;
  }
}
