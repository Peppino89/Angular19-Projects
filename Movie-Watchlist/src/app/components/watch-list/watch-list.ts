import { Component, EventEmitter, Input, Output } from '@angular/core';
import WatchItem from '../../models/watch-item.model';
import { WatchItemComponent } from '../watch-item/watch-item';

@Component({
  selector: 'app-watch-list',
  imports: [WatchItemComponent],
  templateUrl: './watch-list.html',
  styleUrl: './watch-list.css',
})
export class WatchList {
  @Input({ required: true }) items: WatchItem[] = [];

  @Output() deleteItem = new EventEmitter<number>();
  @Output() updateItem = new EventEmitter<WatchItem>();

  onDelete(id: number): void {
    this.deleteItem.emit(id);
  }

  onUpdate(item: WatchItem) {
    this.updateItem.emit(item);
  }
}
