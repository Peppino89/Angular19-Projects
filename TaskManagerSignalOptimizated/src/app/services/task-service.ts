import { computed, effect, Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly storageKey = 'tasks-signal';

  tasks = signal<Task[]>([]);
  searchTerm = signal<string>('');
  selectedFilter = signal<'all' | 'completed' | 'pending'>('all');

  filteredTasks = computed(() => {
    return this.tasks().filter((task) => {
      const matchSearch = task.title.toLowerCase().includes(this.searchTerm().toLowerCase());
      const matchStatus =
        this.selectedFilter() === 'all' ||
        (this.selectedFilter() === 'completed' && task.completed) ||
        (this.selectedFilter() === 'pending' && !task.completed);
      return matchSearch && matchStatus;
    });
  });

  totalTasks = computed(() => this.tasks().length);

  completedTasks = computed(
    () =>
      this.tasks().filter((task) => {
        task.completed;
      }).length,
  );

  pendingTasks = computed(
    () =>
      this.tasks().filter((task) => {
        !task.completed;
      }).length,
  );

  constructor() {
    this.loadFromLocalStorage();

    effect(()=>{
      localStorage.setItem(this.storageKey,JSON.stringify(this.tasks()));
    });
  }

  private loadFromLocalStorage() {
    const data = localStorage.getItem(this.storageKey);
    if (!data) return;

    try{
      const paresedTasks = JSON.parse(data);

      this.tasks.set(
        paresedTasks.map((task:Task) => ({
          ...task,
          createdAt:new Date(task.createdAt)
        }))

      );
    } catch(err) {

      console.error("Errore nel parsing del local storage: "+err);
      this.tasks.set([]);
      localStorage.removeItem(this.storageKey);

    }
  }

  addTask(taskData:{title:string,description:string}):void {

    const newTask: Task={
      id:Date.now(),
      title:taskData.title,
      description: taskData.description,
      completed:false,
      createdAt:new Date()

    }


    this.tasks.update(tasks=>[...tasks,newTask]);

  }

  deleteTask(id: number):void {
    this.tasks.update((tasks)=>tasks.filter(task=>task.id !== id));
  }

  toggleTask(id:number):void {
    this.tasks.update(tasks=>tasks.map(
      task=>task.id === id ? {...task,completed:!task.completed}:task
    ));
  }

  updateTask(updatedTask:Task):void {
    this.tasks.update((tasks)=>
      tasks.map((task)=>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  }

  clearTasks():void {
    this.tasks.set([]);
  }

  setSearchTerm(value:string):void {
    this.searchTerm.set(value);
  }
  setSelectedFilter(value:'all'| 'completed' | 'pending'):void{
    this.selectedFilter.set(value);
  }



}
