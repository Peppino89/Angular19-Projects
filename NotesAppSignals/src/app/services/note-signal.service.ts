import { computed, effect, Injectable, signal } from '@angular/core';
import Note from '../models/note.model';
import CreateNoteDto from '../dtos/create-note.dto';

@Injectable({
  providedIn: 'root',
})
export class NoteSignalService {
  private readonly storageKey = 'notes-signal';

  notes = signal<Note[]>([]);
  searchTerm = signal('');
  selectedCategory = signal('');

  filteredNotes = computed(() => {
    return this.notes()
      .filter((note) => {
        const matchSearch =
          note.title.toLowerCase().includes(this.searchTerm().toLowerCase()) ||
          note.content.toLowerCase().includes(this.searchTerm().toLowerCase());

        const matchCategory =
          this.selectedCategory() === '' ||
          note.category.toLowerCase().includes( this.selectedCategory().toLowerCase());

        return matchSearch && matchCategory;
      })
      .sort((a, b) => {
        if (a.favorite === b.favorite) {
          return b.createdAt.getTime() - a.createdAt.getTime();
        }

        return a.favorite ? -1 : 1;
      });
  });

  totalNotes = computed(() => this.notes().length);

  favoriteNotesCount = computed(() => this.notes().filter((note) => note.favorite).length);

  constructor() {
    this.loadFromLocalStorage();

    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.notes()));
    });
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      this.notes.set([]);
      return;
    }

    try {
      const parsed = JSON.parse(data);

      this.notes.set(
        parsed.map((note: Note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
        })),
      );
    } catch (error) {
      console.error('Errore parsing localStorage', error);
      this.notes.set([]);
      localStorage.removeItem(this.storageKey);
    }
  }

  addNote(dto: CreateNoteDto): void {
    const newNote: Note = {
      id: Date.now(),
      title: dto.title.trim(),
      content: dto.content.trim(),
      category: dto.category.trim(),
      favorite: false,
      createdAt: new Date(),
    };

    this.notes.update((notes) => [...notes, newNote]);
  }

  deleteNote(id: number): void {
    this.notes.update((notes) => notes.filter((note) => note.id !== id));
  }

  updateNote(updatedNote: Note): void {
    this.notes.update((notes) =>
      notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)),
    );
  }

  toggleFavorite(id: number): void {
    this.notes.update((notes) =>
      notes.map((note) => (note.id === id ? { ...note, favorite: !note.favorite } : note)),
    );
  }

  setSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  setSelectedCategory(value: string): void {
    const normalized = value.trim().toLowerCase();// ||'all';
    this.selectedCategory.set(normalized);
  }

  clearNotes(): void {
    this.notes.set([]);
  }
}
