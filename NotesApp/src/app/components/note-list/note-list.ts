import { Component, EventEmitter, Input, Output } from '@angular/core';
import Note from '../../models/note.model';
import { NoteItem } from '../note-item/note-item';

@Component({
  selector: 'app-note-list',
  imports: [NoteItem],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {
  @Input({ required: true }) notes!: Note[];

  @Output() deleteNote = new EventEmitter<number>();
  @Output() toggleFavorite = new EventEmitter<number>();
  @Output() updateNote = new EventEmitter<Note>();

  onDeleteNote(id: number): void {
    this.deleteNote.emit(id);
  }

  onToggleFavorite(id: number): void {
    this.toggleFavorite.emit(id);
  }

  onUpdateNote(note: Note): void {
    this.updateNote.emit(note);
  }
}
