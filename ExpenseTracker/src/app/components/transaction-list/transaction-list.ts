import { Component, EventEmitter, Input, Output } from '@angular/core';
import Transaction from '../../models/transaction.model';
import { TransactionItem } from '../transaction-item/transaction-item';

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionItem],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList {
  @Input({ required: true }) transactions: Transaction[] = [];
  @Output() deleteTransaction: EventEmitter<number> = new EventEmitter<number>();

  onDeleteTransaction(id: number): void {
    this.deleteTransaction.emit(id);
  }
}
