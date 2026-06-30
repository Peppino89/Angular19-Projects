import { Injectable } from '@angular/core';
import Task from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly storageKey = 'tasks';
  private tasks: Task[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      this.tasks = [];
      return;
    }
    this.tasks = JSON.parse(data).map((task: any) => ({
      ...task,
      createdAt: new Date(task.createdAt)
    }));
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.saveToLocalStorage();
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveToLocalStorage();
  }

  toggleTask(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    this.saveToLocalStorage();
  }

  updateTask(updateTask: Task): void {
    this.tasks = this.tasks.map((task) =>task.id === updateTask.id ? updateTask : task );
    this.saveToLocalStorage();
  }

  clearTasks(): void {
    this.tasks = [];
    this.saveToLocalStorage();
  }
}
