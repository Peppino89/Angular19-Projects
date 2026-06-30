import { Component, EventEmitter, Input, Output } from '@angular/core';
import Note from '../../models/note.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-item',
  imports: [NgClass, FormsModule],
  templateUrl: './note-item.html',
  styleUrl: './note-item.css',
})
export class NoteItem {
  @Input({ required: true }) note!: Note;

  @Output() deleNote = new EventEmitter<number>();
  @Output() toggleFavorite = new EventEmitter<number>();
  @Output() updateNote = new EventEmitter<Note>();

  isEditing: boolean = false;
  editTitle: string = '';
  editContent: string = '';
  editCategory: string = '';

  onDelete(): void {
    this.deleNote.emit(this.note.id);
  }

  onToggleFavorite(): void {
    this.toggleFavorite.emit(this.note.id);
  }

  onEdit(): void {
    this.isEditing = true;
    this.editTitle = this.note.title;
    this.editContent = this.note.content;
    this.editCategory = this.note.category;
  }

  onCancel(): void {
    this.isEditing = false;
  }

  onSave(): void {
    const updateNote: Note = {
      ...this.note,
      title: this.editTitle.trim(),
      content: this.editContent.trim(),
      category: this.editCategory.trim(),
    };

    this.updateNote.emit(updateNote);
    this.isEditing = false;
  }

  get formattedDate(): string {
    return this.note.createdAt.toLocaleDateString('it-IT');
  }
}
