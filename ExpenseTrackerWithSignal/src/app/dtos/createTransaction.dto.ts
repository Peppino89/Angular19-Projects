export default interface CreateTransactionDto{
  title:string,
  amount:number,
  type:'income'|'expense',
  category:string,
  date:string,
}
