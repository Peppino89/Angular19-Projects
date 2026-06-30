import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transacation-filter',
  imports: [FormsModule],
  templateUrl: './transacation-filter.html',
  styleUrl: './transacation-filter.css',
})
export class TransacationFilter {
  searchTerm: string = '';
  selectedType: 'all' | 'income' | 'expense' = 'all';

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() typeChanged: EventEmitter<'all' | 'income' | 'expense'> = new EventEmitter<
    'all' | 'income' | 'expense'
  >();

  onSearchChange(): void {
    this.searchChanged.emit(this.searchTerm);
  }

  onTypeChange(): void {
    this.typeChanged.emit(this.selectedType);
  }
}
