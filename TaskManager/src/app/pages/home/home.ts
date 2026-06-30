import { Component } from '@angular/core';
import { TaskForm } from '../../components/task-form/task-form';
import Task from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskList } from '../../components/task-list/task-list';
import { TaskFilter } from '../../components/task-filter/task-filter';
import { TaskStats } from '../../components/task-stats/task-stats';

@Component({
  selector: 'app-home',
  imports: [TaskForm, TaskList, TaskFilter, TaskStats],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  tasks: Task[] = [];
  searchTerm: string = '';
  selectedFilter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  onTaskAdded(taskData: { title: string; description: string }): void {
    const newTask: Task = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date(),
    };

    this.taskService.addTask(newTask);
    this.loadTasks();
  }

  onDeleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  }

  onToggleTask(id: number): void {
    this.taskService.toggleTask(id);
    this.loadTasks();
  }

  onSearchChanged(searchValue: string): void {
    this.searchTerm = searchValue;
  }

  onFilterChanged(filterValue: 'all' | 'completed' | 'pending'): void {
    this.selectedFilter = filterValue;
  }

  onEditTask(task: Task): void {
    this.taskService.updateTask(task);
    this.loadTasks();
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter((task) => {
      const matchSearch = task.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchStatus =
        this.selectedFilter === 'all' ||
        (this.selectedFilter === 'completed' && task.completed) ||
        (this.selectedFilter === 'pending' && !task.completed);

      return matchSearch && matchStatus;
    });
  }

  get totalTasks(): number {
    return this.tasks.length;
  }

  get completedTasks(): number {
    return this.tasks.filter((task) => task.completed).length;
  }

  get pendingTasks(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }
  clearAllTasks(): void {
    this.taskService.clearTasks();
    this.loadTasks();
  }
}
