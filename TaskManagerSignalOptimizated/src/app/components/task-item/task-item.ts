import { Component, input } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<Task>();

  isEditing = false;
  editTitle: string = '';
  editDescription: string = '';

  constructor(private taskService: TaskService) {}

  onDelete(): void {
    this.taskService.deleteTask(this.task().id);
  }

  onToggle(): void {
    this.taskService.toggleTask(this.task().id);
  }

  startEdit(): void {
    const currentTask = this.task();
    this.isEditing = true;
    this.editTitle = currentTask.title;
    this.editDescription = currentTask.description;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
    this.editDescription = '';
  }

  saveEdit(): void {
    const trimmedTitle: string = this.editTitle.trim();
    const trimmedDescription: string = this.editDescription.trim();

    if (!trimmedTitle) return;

    const updatedTask: Task = {
      ...this.task(),
      title: trimmedTitle,
      description: trimmedDescription,
    };

    this.taskService.updateTask(updatedTask);
    this.isEditing = false;
  }
}
