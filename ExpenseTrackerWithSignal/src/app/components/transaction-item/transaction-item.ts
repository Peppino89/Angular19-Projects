import { Component, input } from '@angular/core';
import Transaction from '../../models/transaction.model';
import { TransactionService } from '../../services/transaction-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-transaction-item',
  imports: [NgClass],
  templateUrl: './transaction-item.html',
  styleUrl: './transaction-item.css',
})
export class TransactionItem {
  transaction = input.required<Transaction>();

  constructor(private transactionService: TransactionService) {}

  onDelete(): void {
    this.transactionService.deleteTransaction(this.transaction().id);
  }

  get formattedDate(): string {
    return this.transaction().date.toLocaleDateString('it-IT');
  }
}
