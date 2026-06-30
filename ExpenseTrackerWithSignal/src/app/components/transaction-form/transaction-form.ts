import { Component } from '@angular/core';
import { TransactionService } from '../../services/transaction-service';
import Transaction from '../../models/transaction.model';
import CreateTransactionDto from '../../dtos/createTransaction.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule],
  templateUrl: './transaction-form.html',
  styleUrl: './transaction-form.css',
})
export class TransactionForm {
  title: string = '';
  amount: number | null = null;
  type: 'income' | 'expense' = 'income';
  category: string = '';
  date: string = '';

  constructor(private transactionService: TransactionService) {}

  onSubmit(): void {
    const trimmedTitle = this.title.trim();
    const trimmedCategory = this.category.trim();

    if (!trimmedTitle || !trimmedCategory || !this.amount || this.amount <= 0 || !this.date) {
      return;
    }

    const dto: CreateTransactionDto = {
      title: trimmedTitle,
      amount: this.amount,
      type: this.type,
      category: trimmedCategory,
      date: this.date,
    };

    this.transactionService.addTransaction(dto);
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.amount = null;
    this.type = 'income';
    this.category = '';
    this.date = '';
  }
}
