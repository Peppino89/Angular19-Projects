import { Component, input } from '@angular/core';
import Note from '../../models/note.model';
import { NoteSignalService } from '../../services/note-signal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-item',
  imports: [FormsModule],
  templateUrl: './note-item.html',
  styleUrl: './note-item.css',
})
export class NoteItem {
  note = input.required<Note>();

  isEditing: boolean = false;
  editTitle: string = '';
  editContent: string = '';
  editCategory: string = '';

  constructor(private noteSignalService: NoteSignalService) {}

  onDelete() {
    this.noteSignalService.deleteNote(this.note().id);
  }

  onToggleFavorite(): void {
    this.noteSignalService.toggleFavorite(this.note().id);
  }

  onEdit(): void {
    const currentNote = this.note();
    this.isEditing = true;
    this.editTitle = currentNote.title;
    this.editContent = currentNote.content;
    this.editCategory = currentNote.category;
  }

  onCancel(): void {
    this.isEditing = false;
    this.editTitle = '';
    this.editContent = '';
    this.editCategory = '';
  }

  onSave(): void {
    const trimmedTitle = this.editTitle.trim();
    const trimmedContent = this.editContent.trim();
    const trimmedCategory = this.editCategory.trim();
    if (!trimmedTitle || !trimmedContent || !trimmedCategory) {
      return;
    }
    const updatedNote: Note = {
      ...this.note(),
      title: trimmedTitle,
      content: trimmedContent,
      category: trimmedCategory,
    };
    this.noteSignalService.updateNote(updatedNote);
    this.isEditing = false;
  }

  get formattedDate(): string {
    return this.note().createdAt.toLocaleDateString('it-IT');
  }
}
