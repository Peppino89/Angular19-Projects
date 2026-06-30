import { Injectable } from '@angular/core';
import Note from '../models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private readonly storageKey = 'notes';
  private notes: Note[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  getNotes(): Note[] {
    return [...this.notes];
  }

  addNote(newNote: Note): void {
    this.notes.push(newNote);
    this.saveToLocalStorage();
  }

  deleteNote(id: number): void {
    console.log("id: ",id);
    this.notes = this.notes.filter((note) => note.id !== id);
    this.saveToLocalStorage();
  }

  updateNote(updateNote: Note): void {
    this.notes = this.notes.map((note) => (note.id == updateNote.id ? updateNote : note));
    this.saveToLocalStorage();
  }

  toggleFavorite(id: number): void {
    this.notes = this.notes.map((note) =>
      note.id === id ? { ...note, favorite: !note.favorite } : note,
    );
    this.saveToLocalStorage();
  }

  private saveToLocalStorage(): void {
     localStorage.setItem(this.storageKey, JSON.stringify(this.notes));
  }


  private loadFromLocalStorage(): void {
     const data = localStorage.getItem(this.storageKey);

     if (!data) {
       this.notes = [];
       return;
     }
     try{
       const parsedNotes = JSON.parse(data);
       this.notes = parsedNotes.map((note: Note) =>
         ({
           ...note,
           createdAt: new Date(note.createdAt),
         })
       );
     }catch(error){
       console.log("Errore parsing localStorage: ",error);
       this.notes = [];
       localStorage.removeItem(this.storageKey);
     }
  }
}
