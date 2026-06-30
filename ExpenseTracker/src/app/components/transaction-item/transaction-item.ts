import { Component, EventEmitter, Input, Output } from '@angular/core';
import Transaction from '../../models/transaction.model';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-item',
  imports: [CommonModule],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.css',
})
export class TransactionItem {
  @Input({ required: true }) transaction!: Transaction;

  @Output() deleteTransaction: EventEmitter<number> = new EventEmitter<number>();

  onDelete() {
    this.deleteTransaction.emit(this.transaction.id);
  }

  get formattedDate(): string {
    return this.transaction.date.toLocaleDateString('it-IT');
  }
}
