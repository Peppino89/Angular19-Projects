import { Component } from '@angular/core';
import { TaskService } from '../../services/task-service';
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

  constructor(private taskService: TaskService) {}

  onSubmit(): void {
    const trimmedTitle = this.title.trim();
    const trimmedDescription = this.description.trim();

    if (!trimmedTitle) return;

    this.taskService.addTask({ title: trimmedTitle, description: trimmedDescription });
    this.title = '';
    this.description = '';
  }
}
