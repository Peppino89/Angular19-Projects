import { Component } from '@angular/core';
import { TransactionForm } from '../../components/transaction-form/transaction-form';
import { TransactionStats } from '../../components/transaction-stats/transaction-stats';
import { TransactionList } from '../../components/transaction-list/transaction-list';
import { TransactionFilter } from '../../components/transaction-filter/transaction-filter';

@Component({
  selector: 'app-home',
  imports: [TransactionForm, TransactionStats, TransactionList, TransactionFilter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
