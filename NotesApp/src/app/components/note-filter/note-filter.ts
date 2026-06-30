import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-filter',
  imports: [FormsModule],
  templateUrl: './note-filter.html',
  styleUrl: './note-filter.css',
})
export class NoteFilter {
  searchTerm: string = '';
  selectedCategory: string = 'all';

  @Output() searchChanged = new EventEmitter<string>();
  @Output() categoryChanged = new EventEmitter<string>();

  onSearchChanged(): void {
    this.searchChanged.emit(this.searchTerm);
  }

  onCategoryChanged(): void {
    this.categoryChanged.emit(this.selectedCategory);
  }
}
