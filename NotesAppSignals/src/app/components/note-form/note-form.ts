import { Component } from '@angular/core';
import { NoteSignalService } from '../../services/note-signal.service';
import CreateNoteDto from '../../dtos/create-note.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-form',
  imports: [FormsModule],
  templateUrl: './note-form.html',
  styleUrl: './note-form.css',
})
export class NoteForm {
  title: string = '';
  content: string = '';
  category: string = '';

  constructor(private noteSignalService: NoteSignalService) {}

  onSubmit(): void {
    const trimmedTitle = this.title.trim();
    const trimmedContent = this.content.trim();
    const trimmedCategory = this.category.trim();

    if (!trimmedTitle || !trimmedContent || !trimmedCategory) return;

    const noteDto: CreateNoteDto = {
      title: trimmedTitle,
      content: trimmedContent,
      category: trimmedCategory,
    };

    this.noteSignalService.addNote(noteDto);
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.content = '';
    this.category = '';
  }
}
