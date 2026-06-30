import { Component, EventEmitter, Input, Output } from '@angular/core';
import WatchItem from '../../models/watch-item.model';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-watch-item',
  imports: [NgClass, FormsModule],
  templateUrl: './watch-item.html',
  styleUrl: './watch-item.css',
})
export class WatchItemComponent {
  @Input({ required: true }) item!: WatchItem;

  @Output() deleItem = new EventEmitter<number>();
  @Output() updateItem = new EventEmitter<WatchItem>();

  onDeleteItem(): void {
    this.deleItem.emit(this.item.id);
  }

  onStatusChange(newStatus: 'planned' | 'watching' | 'watched'): void {
    const updateItem: WatchItem = {
      ...this.item,
      status: newStatus,
    };
    this.updateItem.emit(updateItem);
  }

  get formattedDate(): string {
    return this.item.createdAt.toLocaleDateString('it-IT');
  }
}
