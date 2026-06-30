import { Component, EventEmitter, Output } from '@angular/core';
import CreateTransactionDto from '../../dtos/create-transaction.dto';
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

  @Output() transactionAdded = new EventEmitter<CreateTransactionDto>();

  onSubmit(): void {
    const trimmedTitle = this.title.trim();
    const trimmedCategory = this.category.trim();

    if (!trimmedTitle || !this.amount || this.amount <= 0 || !trimmedCategory || !this.date) {
      return;
    }

    const dto: CreateTransactionDto = {
      title: trimmedTitle,
      amount: this.amount,
      type: this.type,
      category: this.category,
      date: this.date,
    };

    this.transactionAdded.emit(dto);
    this.resetForm();
    console.log(dto);
  }

  private resetForm(): void {
    this.title = '';
    this.amount = null;
    this.type = 'income';
    this.category = '';
    this.date = '';
  }
}
