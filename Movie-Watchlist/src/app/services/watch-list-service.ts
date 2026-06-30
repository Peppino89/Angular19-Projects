import { Injectable } from '@angular/core';
import WatchItem from '../models/watch-item.model';

@Injectable({
  providedIn: 'root',
})
export class WatchListService {
  private readonly storageKey = "watchlist";
  private items: WatchItem[] = [];

  constructor() {
    this.loadFromLocalStorage();
  }

  getItems(): WatchItem[]{
    return [...this.items];//ritorno una copia
  }

  addItem(item: WatchItem){
    this.items.push(item);
    this.saveToLocalStorage();
  }

  deleteItem(id:number){
    this.items = this.items.filter(item => item.id !== id);
    this.saveToLocalStorage();
  }

  updateItem(newItem: WatchItem){
    this.items = this.items.map((item)=>item.id === newItem.id ? newItem : item);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage():void{
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadFromLocalStorage():void{
    const data = localStorage.getItem(this.storageKey);
    if(!data){
       this.items = [] ;
       return;
    }

    try{

      const parsedData = JSON.parse(data);
      this.items = parsedData.map((item:WatchItem)=>({
        ...item,
        createdAt: new Date(item.createdAt),
      }));
    }catch(err){
      console.error("Errore parsing localStorage",err);
      this.items = [];
      localStorage.removeItem(this.storageKey);
    }
  }



}
