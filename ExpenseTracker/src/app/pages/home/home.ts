import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import Transaction from '../../models/transaction.model';
import CreateTransactionDto from '../../dtos/create-transaction.dto';
import { TransactionForm } from '../../components/transaction-form/transaction-form';
import { TransactionList } from '../../components/transaction-list/transaction-list';
import { TransacationFilter } from '../../components/transacation-filter/transacation-filter';
import { TransactionStats } from '../../components/transaction-stats/transaction-stats';

@Component({
  selector: 'app-home',
  imports: [TransactionForm, TransactionList, TransacationFilter, TransactionStats],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  transactions: Transaction[] = [];
  searchTerm: string = '';
  selectedType: 'all' | 'income' | 'expense' = 'all';

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactions = this.transactionService.getTransaction();
  }

  get filteredTransactions(): Transaction[] {
    return this.transactions.filter((transaction: Transaction) => {
      const matchSearch = transaction.title.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchType = this.selectedType === 'all' || transaction.type === this.selectedType;

      return matchSearch && matchType;
    });
  }

  onTransactionAdded(transactionData: CreateTransactionDto): void {
    const newTransaction: Transaction = {
      id: Date.now(),
      title: transactionData.title,
      amount: transactionData.amount,
      type: transactionData.type,
      category: transactionData.category,
      date: new Date(transactionData.date),
    };

    this.transactionService.addTransaction(newTransaction);
    this.loadTransactions();
  }

  onDeleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id);
    this.loadTransactions();
  }

  onSearchChanged(value: string): void {
    this.searchTerm = value;
  }

  onTypeChanged(type: 'all' | 'income' | 'expense'): void {
    this.selectedType = type;
  }

  get totalIncome(): number {
    return this.transactions
      .filter((transaction) => transaction.type === 'income')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((total, transaction) => total + transaction.amount, 0);
  }

  get balance(): number {
    return this.totalIncome - this.totalExpense;
  }
}
