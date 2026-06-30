import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-filter',
  imports: [FormsModule],
  templateUrl: './task-filter.html',
  styleUrl: './task-filter.css',
})
export class TaskFilter {
  searchChanged = output<string>();
  filterChanged = output<'all' | 'completed' | 'pending'>();

  searchTerm = '';
  selectedFilter: 'all' | 'completed' | 'pending' = 'all';

  onSearchChange(): void {
    this.searchChanged.emit(this.searchTerm);
  }

  onFilterChange(): void {
    this.filterChanged.emit(this.selectedFilter);
  }
}
