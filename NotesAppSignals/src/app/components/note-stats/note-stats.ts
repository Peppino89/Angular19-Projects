import { Component } from '@angular/core';
import { NoteSignalService } from '../../services/note-signal.service';

@Component({
  selector: 'app-note-stats',
  imports: [],
  templateUrl: './note-stats.html',
  styleUrl: './note-stats.css',
})
export class NoteStats {
  constructor(public noteSignalService: NoteSignalService) {}

}
