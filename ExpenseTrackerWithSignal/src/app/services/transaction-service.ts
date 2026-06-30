import { computed, effect, Injectable, signal } from '@angular/core';
import Transaction from '../models/transaction.model';
import CreateTransactionDto from '../dtos/createTransaction.dto';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly storageKey:string = 'transactions-signal';

  transactions=signal<Transaction[]>([]);
  searchTerm = signal<string>('');
  selectedType = signal<'all'|'income'|'expense'>('all');

  filteredTransactions = computed(()=>{
    return this.transactions().filter(
      (transaction:Transaction) => {
        const matchSearch  = transaction.title.toLowerCase()
                                  .includes(this.searchTerm().toLowerCase());
        const matchType = this.selectedType()==='all'||transaction.type===this.selectedType();

        return matchSearch && matchType;
      });
  });

  totalIncome= computed(()=>{
    return this.transactions().filter(transaction=>transaction.type==='income')
                 .reduce((total,transaction)=>total+transaction.amount,0);
  });

  totalExpense= computed(()=>{

    return this.transactions().filter(transaction=>transaction.type==='expense')
                              .reduce((total,transaction)=>total+transaction.amount,0);

  });

  balance = computed(()=>{
    return this.totalIncome() - this.totalExpense();
  });
  constructor() {
    this.loadFromLocalStorage();

    effect(()=>{
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.transactions())
      );
    });

  }

  private loadFromLocalStorage():void{

    const data = localStorage.getItem(this.storageKey);

    if(!data){
      this.transactions.set([]);
      return;
    }

    try{
      const parsed = JSON.parse(data);

      this.transactions.set(
        parsed.map((transaction:Transaction)=>({
          ...transaction,
          date:new Date(transaction.date)
        })));

    }catch(err){

      console.log('errore  nel localstorage');
      this.transactions.set([]);
      localStorage.removeItem(this.storageKey);
    }
  }

  addTransaction(transactionDto:CreateTransactionDto):void{
    const newTransaction = {
      id:Date.now(),
      title:transactionDto.title.trim(),
      amount:transactionDto.amount,
      type: transactionDto.type,
      category:transactionDto.category.trim(),
      date:new Date(transactionDto.date),

    };

    this.transactions.update(//crea il nuovo array e aggiungi la nuova transazione
      (transactions)=>[...transactions,newTransaction]);
  }

  deleteTransaction(id:number):void{
    this.transactions.update((transactions)=>
      transactions.filter(transaction=>transaction.id !== id)
    );
  }

  setSearchTerm(value:string):void{
    this.searchTerm.set(value);
  }

  setSelectedType(value:'all'|'income'|'expense'):void{
    this.selectedType.set(value);
  }

  clearTransactions():void{
    this.transactions.set([]);
  }

}
