import { Component, OnInit } from '@angular/core';
import Note from '../../models/note.model';
import { NoteService } from '../../services/note-service';
import CreateNoteDto from '../../dtos/create-note.dto';
import { NoteForm } from '../../components/note-form/note-form';
import { NoteList } from '../../components/note-list/note-list';
import { NoteFilter } from '../../components/note-filter/note-filter';

@Component({
  selector: 'app-home',
  imports: [NoteForm, NoteList, NoteFilter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  notes: Note[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'all';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.notes = this.noteService.getNotes();
  }

  onNoteAdded(noteData: CreateNoteDto): void {
    const newNote: Note = {
      id: Date.now(),
      title: noteData.title,
      content: noteData.content,
      category: noteData.category,
      favorite: false,
      createdAt: new Date(),
    };

    this.noteService.addNote(newNote);
    this.loadNotes();
  }

  onDeleteNote(noteId: number): void {
    this.noteService.deleteNote(noteId);
    this.loadNotes();
  }

  onToggleFavorite(noteId: number): void {
    this.noteService.toggleFavorite(noteId);
    this.loadNotes();
  }

  onUpdateNote(note: Note): void {
    this.noteService.updateNote(note);
    this.loadNotes();
  }

  onSearchChanged(search: string): void {
    this.searchTerm = search;
  }

  onCategoryChanged(category: string): void {
    this.selectedCategory = category.trim() || 'all';
  }

  get filteredNotes(): Note[] {
    return this.notes
      .filter((note) => {
        const matchSearch =
          note.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(this.searchTerm.toLowerCase());

        const matchCategory =
          this.selectedCategory === 'all' || note.category.toLowerCase() === this.selectedCategory;

        return matchSearch && matchCategory;
      })
      .sort((a, b) => {
        if (a.favorite === b.favorite) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }

        return a.favorite ? -1 : 1;
      });
  }

  get totalNotes(): number {
    return this.notes.length;
  }

  get favoriteNotesCount(): number {
    return this.notes.filter((note) => note.favorite).length;
  }
}
