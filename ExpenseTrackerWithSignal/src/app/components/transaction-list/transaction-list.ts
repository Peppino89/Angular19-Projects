import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import { TransactionItem } from '../transaction-item/transaction-item';

@Component({
  selector: 'app-transaction-list',
  imports: [TransactionItem],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css',
})
export class TransactionList {

  constructor(public transactionService: TransactionService) {}

}
