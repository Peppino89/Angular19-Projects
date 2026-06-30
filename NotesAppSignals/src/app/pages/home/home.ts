import { Component } from '@angular/core';
import { NoteForm } from '../../components/note-form/note-form';
import { NoteList } from '../../components/note-list/note-list';
import { NoteFilter } from '../../components/note-filter/note-filter';
import { NoteStats } from '../../components/note-stats/note-stats';

@Component({
  selector: 'app-home',
  imports: [NoteForm, NoteList, NoteFilter, NoteStats],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
