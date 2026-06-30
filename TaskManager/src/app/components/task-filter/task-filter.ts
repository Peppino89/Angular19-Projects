import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css',
})
export class TaskFilter {
  searchTerm: string = '';
  selectedFilter: 'all' | 'completed' | 'pending' = 'all';

  @Output() searchChanged = new EventEmitter<string>();
  @Output() filterChanged = new EventEmitter<'all' | 'completed' | 'pending'>();

  onSearchChange(): void {
    this.searchChanged.emit(this.searchTerm);
  }
  onFilterChange(): void {
    this.filterChanged.emit(this.selectedFilter);
  }
}
