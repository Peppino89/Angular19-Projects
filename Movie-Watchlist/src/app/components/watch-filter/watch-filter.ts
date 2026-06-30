import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-watch-filter',
  imports: [FormsModule],
  templateUrl: './watch-filter.html',
  styleUrl: './watch-filter.css',
})
export class WatchFilter {
  searchTerm: string = '';
  selectedStatus: 'all' | 'planned' | 'watching' | 'watched' = 'all';

  @Output() searchChanged = new EventEmitter<string>();
  @Output() statusChanged = new EventEmitter<'all' | 'planned' | 'watching' | 'watched'>();

  onSearchChange(): void {
    this.searchChanged.emit(this.searchTerm);
  }

  onStatusChange(): void {
    this.statusChanged.emit(this.selectedStatus);
  }
}
