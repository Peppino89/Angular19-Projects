import { Component, input, output } from '@angular/core';
import { Task } from '../../model/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  task = input.required<Task>();

  deleteTask = output<number>();
  toggleTask = output<number>();
  editTask = output<Task>();

  isEditing: boolean = false;
  editTile: string = '';
  editDescription: string | undefined = '';

  onDelete(): void {
    this.deleteTask.emit(this.task().id);
  }

  onToggle(): void {
    this.toggleTask.emit(this.task().id);
  }

  startEdit(): void {
    const currentTask = this.task();
    this.isEditing = true;
    this.editTile = currentTask.title;
    this.editDescription = currentTask.description;
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.editTile = '';
    this.editDescription = '';
  }
  saveEdit(): void {
    const updatedTask: Task = {
      ...this.task(),
      title: this.editTile.trim(),
      description: this.editDescription?.trim(),
    };
    this.editTask.emit(updatedTask);

    this.isEditing = false;
  }
}
