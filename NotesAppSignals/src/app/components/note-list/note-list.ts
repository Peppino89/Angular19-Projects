import { Component } from '@angular/core';
import { NoteSignalService } from '../../services/note-signal.service';
import { NoteItem } from '../note-item/note-item';

@Component({
  selector: 'app-note-list',
  imports: [NoteItem],
  templateUrl: './note-list.html',
  styleUrl: './note-list.css',
})
export class NoteList {
  constructor(public noteSignalService: NoteSignalService) {}
}
