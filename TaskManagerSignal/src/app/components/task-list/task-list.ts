import { Component, input, output } from '@angular/core';
import { Task } from '../../model/task.model';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  tasks = input.required<Task[]>();

  deleteTask = output<number>();
  toggleTask = output<number>();
  editTask = output<Task>();

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
