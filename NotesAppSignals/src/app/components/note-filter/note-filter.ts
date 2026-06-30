import { Component } from '@angular/core';
import { NoteSignalService } from '../../services/note-signal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-filter',
  imports: [FormsModule],
  templateUrl: './note-filter.html',
  styleUrl: './note-filter.css',
})
export class NoteFilter {
  constructor(public noteSignalService: NoteSignalService) {}
}
