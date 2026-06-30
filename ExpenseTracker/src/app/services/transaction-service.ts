import { Injectable } from '@angular/core';
import Transaction from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  private transactions: Transaction[] = [];
  private readonly storageKey = 'transactions';

  constructor() {
    this.loadFromLocalStorage();
  }

  getTransaction(): Transaction[] {
    return [...this.transactions];
  }

  addTransaction(transaction: Transaction):void {
    this.transactions.push(transaction);
    this.saveToLocalStorage();
  }

  deleteTransaction(id: number):void {
    this.transactions = this.transactions.filter(transaction => transaction.id !== id);
    this.saveToLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      this.transactions=[];
      return;
    }

    try{
      const parsed= JSON.parse(data);

      this.transactions = parsed.map(
        (transaction: Transaction) => ({
          ...transaction,
          date: new Date(transaction.date),
        })

      );
    }catch(error){
      console.log('Error parsing localStorage',error);
      this.transactions=[];
      localStorage.removeItem(this.storageKey);
    }



  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));
  }




}
