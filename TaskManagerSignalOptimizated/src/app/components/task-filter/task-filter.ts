import { Component, effect, model } from '@angular/core';
import { TaskService } from '../../services/task-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css',
})
export class TaskFilter {
  searchTerm = model<string>('');
  selectedFilter = model<'all' | 'completed' | 'pending'>('all');

  constructor(private taskService: TaskService) {

    this.searchTerm.set(this.taskService.searchTerm());
    this.selectedFilter.set(this.taskService.selectedFilter());

    effect(() => this.taskService.setSearchTerm(this.searchTerm()));
    effect(() => this.taskService.setSelectedFilter(this.selectedFilter()));
  }
}
