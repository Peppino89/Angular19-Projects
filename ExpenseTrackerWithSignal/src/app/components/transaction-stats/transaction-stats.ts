import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';

@Component({
  selector: 'app-transaction-stats',
  imports: [],
  templateUrl: './transaction-stats.html',
  styleUrl: './transaction-stats.css',
})
export class TransactionStats {

  constructor(public transactionService: TransactionService ) {}
  // E` stato dichiarato public perchè devo leggere nel template Html
}
