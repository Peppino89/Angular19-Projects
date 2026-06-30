import { Component } from '@angular/core';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskFilter } from '../../components/task-filter/task-filter';
import { TaskStats } from '../../components/task-stats/task-stats';
import { TaskList } from '../../components/task-list/task-list';
import { TaskSignalService } from '../../services/task-signal.service';
import { Task } from '../../model/task.model';

@Component({
  selector: 'app-home',
  imports: [TaskForm, TaskFilter, TaskStats, TaskList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(public taskService: TaskSignalService) {}

  onTaskAdded(taskData: { title: string; description: string }): void {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date(),
    };

    this.taskService.addTask(newTask);
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }

  onToggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  onEditTask(updateTask: Task): void {
    this.taskService.updateTask(updateTask);
  }
  onSearchChanged(searchValue: string): void {
    this.taskService.setSearchTerm(searchValue);
  }

  onFilterChanged(filterValue: 'all' | 'completed' | 'pending'): void {
    this.taskService.setSelectedFilter(filterValue);
  }

  clearAllTasks(): void {
    this.taskService.clearTasks();
  }

  confirmClear(): void {
    const confirmed = confirm('Sei sicuro di voler eliminare tutti i task?');

    if (confirmed) {
      this.clearAllTasks();
    }
  }
}
