import { Component, EventEmitter, Input, Output } from '@angular/core';
import Task from '../../models/task.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
})
export class TaskItem {
  @Input({ required: true }) task!: Task;

  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();

  isEditing: boolean = false;
  editTitle: string = '';
  editDescription: string | undefined='';

  onDelete(): void {
    this.deleteTask.emit(this.task.id);
  }

  onToggle(): void {
    this.toggleTask.emit(this.task.id);
  }

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.task.title;
    this.editDescription = this.task.description;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
    this.editDescription = '';
  }

  saveEdit(): void {
    const trimmedTitle = this.editTitle.trim();
    const trimmedDescription = this.editDescription?.trim();

    if (!trimmedTitle) return;

    const updateTask: Task = {
      ...this.task,
      title: trimmedTitle,
      description: trimmedDescription,
    };


    this.editTask.emit(updateTask);
    this.isEditing = false;
  }
}
