import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  title: string = '';
  description: string = '';

  @Output() taskAdded = new EventEmitter<{ title: string; description: string }>();

  onSubmit(): void {
    const trimmedTitle = this.title.trim();
    const trimmedDescription = this.description.trim();

    if (!trimmedTitle) return;

    this.taskAdded.emit({
      title: trimmedTitle,
      description: trimmedDescription,
    });

    this.title = '';
    this.description = '';

  }


}
