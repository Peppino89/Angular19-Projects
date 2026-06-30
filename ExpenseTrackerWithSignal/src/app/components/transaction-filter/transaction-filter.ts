import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-filter',
  imports: [FormsModule],
  templateUrl: './transaction-filter.html',
  styleUrl: './transaction-filter.css',
})
export class TransactionFilter {
  constructor(public transactionService: TransactionService) {}
}
