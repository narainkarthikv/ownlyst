import { jsPDF } from 'jspdf';
import type { Note } from '../models/note.model';

export class PDFUtil {
  static generatePDF(notes: Note[]): void {
    const doc = new jsPDF();
    let y = 15;
    doc.setFontSize(20);
    doc.text('Notes Export', 10, y);
    y += 15;
    doc.setFontSize(12);
    notes.forEach((note) => {
      if (y > 270) {
        doc.addPage();
        y = 15;
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(note.title, 10, y);
      y += 8;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.text(`Status: ${note.status} | Priority: ${note.priority}`, 10, y);
      y += 8;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      const splitContent = doc.splitTextToSize(
        note.content || 'No content',
        190
      );
      if (y + splitContent.length * 6 > 280) {
        doc.addPage();
        y = 15;
      }
      doc.text(splitContent, 10, y);
      y += splitContent.length * 6 + 12;
    });
    doc.save(`ownlyst-export-${new Date().toISOString().split('T')[0]}.pdf`);
  }
}
