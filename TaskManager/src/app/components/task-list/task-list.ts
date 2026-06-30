import { Component, EventEmitter, Input, Output } from '@angular/core';
import Task from '../../models/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  @Input({ required: true }) tasks: Task[] = [];

  @Output() deleteTask = new EventEmitter<number>();
  @Output() toggleTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();

  onDeleteTask(id: number): void {
    this.deleteTask.emit(id);
  }

  onToggleTask(id: number): void {
    this.toggleTask.emit(id);
  }
onEditTask(task: Task): void {
    this.editTask.emit(task);
}
}
