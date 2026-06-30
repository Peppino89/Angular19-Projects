import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() noteAdded = new EventEmitter<CreateNoteDto>();

  onSubmit(): void {
    const trimmedTitle: string = this.title.trim();
    const trimmedContent: string = this.content.trim();
    const trimmedCategory: string = this.category.trim();

    if (!trimmedTitle || !trimmedContent || !trimmedCategory) {
      return;
    }

    const dto: CreateNoteDto = {
      title: trimmedTitle,
      content: trimmedContent,
      category: trimmedCategory,
    };

    this.noteAdded.emit(dto);
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.content = '';
    this.category = '';
  }
}
