import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  taskAdded = output<{ title: string; description: string }>();

  title = '';
  description = '';

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
