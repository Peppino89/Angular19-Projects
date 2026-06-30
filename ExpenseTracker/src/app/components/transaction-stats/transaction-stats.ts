import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transaction-stats',
  imports: [],
  templateUrl: './transaction-stats.html',
  styleUrl: './transaction-stats.css',
})
export class TransactionStats {
  @Input({ required: true }) totalIncome!: number;
  @Input({ required: true }) totalExpense!: number;
  @Input({ required: true }) balance!: number;
}
