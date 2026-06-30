import { computed, effect, Injectable, signal } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({providedIn: 'root'})
export class TaskSignalService {
  private readonly storageKey = 'tasks-Signal';

  tasks= signal<Task[]>([]);
  searchTerm = signal<string>('');
  selectedFilter = signal<'all' | 'completed' | 'pending'>('all');

  filteredTasks = computed(
    ()=>{
    return this.tasks().filter((task) => {

      const matchSearch = task.title.toLowerCase().includes(this.searchTerm().toLowerCase());

      const matchStatus = this.selectedFilter()==='all'||
                                   (this.selectedFilter()==='completed'&& task.completed)||
                                   (this.selectedFilter()==='pending' && !task.completed);
      return matchSearch && matchStatus;
    });
  });

  totalTasks= computed(()=>this.tasks().length);
  completedTasks= computed(()=>this.tasks().filter((task) => task.completed).length);
  pendingTasks= computed(()=>this.tasks().filter((task) => !task.completed).length);

  constructor() {
    this.loadFromLocalStorage();

    effect(()=>{
      localStorage.setItem(this.storageKey, JSON.stringify(this.tasks()));
    });
  }

  private loadFromLocalStorage():void{
    const data = localStorage.getItem(this.storageKey);
    if(!data){
      this.tasks.set([]);
      return
    }

    try{
    const parsedTasks = JSON.parse(data);
    this.tasks.set(
      parsedTasks.map((task:Task)=>({
        ...task,
        createdAt: new Date(task.createdAt),
      }))
    );
    }catch(error){
      console.error("Errore parsing in localStorage:", error);
      this.tasks.set([]);
      localStorage.removeItem(this.storageKey);//Pulisco i dati corrotti;
    }

  }

  addTask(task:Task):void{
    this.tasks.update(tasks=>[...tasks,task]);
  }

  deleteTask(id: number): void{
    this.tasks.update(tasks=>tasks.filter(task=> task.id !== id));
  }

  toggleTask(id:number):void{

    this.tasks.update(tasks=>tasks.map(task=> task.id===id ?{...task,completed:!task.completed}:task));


  }

  updateTask(updateTask: Task): void{

   this.tasks.update(tasks=>
      tasks.map(task=> task.id === updateTask.id ? updateTask : task)
   );}

  clearTasks(): void{

    this.tasks.set([]);
  }

  setSearchTerm(value: string):void{
    this.searchTerm.set(value);
  }

  setSelectedFilter(value: 'all'| 'completed'| 'pending'):void{
    this.selectedFilter.set(value);
  }


}
