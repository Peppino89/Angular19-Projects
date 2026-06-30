import { Component, OnInit } from '@angular/core';
import WatchItem from '../../models/watch-item.model';
import { WatchListService } from '../../services/watch-list-service';
import CreateWatchItemDto from '../../dtos/create-watch-item.dto';
import { WatchItemForm } from '../../components/watch-item-form/watch-item-form';
import { WatchList } from '../../components/watch-list/watch-list';
import { WatchFilter } from '../../components/watch-filter/watch-filter';

@Component({
  selector: 'app-home',
  imports: [WatchItemForm, WatchList, WatchFilter],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  items: WatchItem[] = [];
  searchTerm: string = '';
  selectedStatus: 'all' | 'planned' | 'watching' | 'watched' = 'all';

  constructor(private watchListService: WatchListService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items = this.watchListService.getItems();
  }

  get filteredItems(): WatchItem[] {
    return this.items.filter((item: WatchItem) => {
      const matchSearchTerm = item.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchStatus = this.selectedStatus === 'all' || item.status === this.selectedStatus;

      return matchSearchTerm && matchStatus;
    });
  }

  onDeleteItem(id: number): void {
    this.watchListService.deleteItem(id);
    this.loadItems();
  }

  onUpdateItem(item: WatchItem): void {
    this.watchListService.updateItem(item);
    this.loadItems();
  }

  onSearchChanged(value: string): void {
    this.searchTerm = value;
  }

  onStatusChanged(value: 'all' | 'planned' | 'watching' | 'watched'): void {
    this.selectedStatus = value;
  }
  get totalItems(): number {
    return this.items.length;
  }

  get watchedCount(): number {
    return this.items.filter((item) => item.status === 'watched').length;
  }

  get plannedCount(): number {
    return this.items.filter((item) => item.status === 'planned').length;
  }

  onAdded(itemDto: CreateWatchItemDto) {
    const newWatchItem: WatchItem = {
      id: Date.now(),
      title: itemDto.title,
      genre: itemDto.genre,
      type: itemDto.type,
      status: itemDto.status,
      rating: itemDto.rating,
      createdAt: new Date(),
    };

    this.watchListService.addItem(newWatchItem);
    this.loadItems();
  }
}
