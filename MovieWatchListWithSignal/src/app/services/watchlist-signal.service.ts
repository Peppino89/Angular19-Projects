import { computed, effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Routes } from '@angular/router';
import { Watch } from '@angular/core/primitives/signals';
import WatchItem from '../models/watch-item.model';
import CreateWatchItemDto from '../dtos/create-watch-item.dto';

@Injectable({
  providedIn: 'root',
})
export class WatchlistSignalService {
  private readonly storageKey = 'watchlist-signal';

  items = signal<WatchItem[]>([]);
  searchItem = signal<string>('');
  selectedStatus = signal<'all' | 'planned' | 'watching' | 'watched'>('all');

  filteredItems = computed(() => {
    return this.items().filter((item) => {
      const matchSearch = item.title.toLowerCase().includes(this.searchItem());

      const matchStatus = this.selectedStatus() === 'all' || item.status === this.selectedStatus();

      return matchSearch && matchStatus;
    });
  });

  totalItems = computed(() => this.items().length);

  watchedCount = computed(
    () =>
      this.items().filter((item) => {
        item.status === 'watched';
      }).length,
  );
  watchingCount = computed(
    () =>
      this.items().filter((item) => {
        item.status === 'watching';
      }).length,
  );

  plannedCount = computed(
    () =>
      this.items().filter((item) => {
        item.status === 'planned';
      }).length,
  );

  constructor() {
    this.loadFromLocalStorage();
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    });
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.storageKey);

    if (!data) {
      this.items.set([]);
      return;
    }

    try {
      const parsed = JSON.parse(data);

      this.items.set(
        parsed.map((item: WatchItem) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        })),
      );
    } catch (error) {
      console.error('Errore parsing localstorage', error);
      this.items.set([]);
      localStorage.removeItem(this.storageKey);
    }
  }

  addItem(dto: CreateWatchItemDto) {
    const newItem: WatchItem = {
      id: Date.now(),
      title: dto.title,
      genre: dto.genre,
      type: dto.type,
      status: dto.status,
      rating: dto.rating,
      createdAt: new Date(),
    };

    this.items.update((itmes) => [...itmes, newItem]);
  }

  deleteItem(id: number): void {
    this.items.update((items) => items.filter((item) => item.id !== id));
  }

  updateItem(updateItem: WatchItem): void {
    this.items.update((items) =>
      items.map((item) => (item.id === updateItem.id ? updateItem : item)),
    );
  }

  setSearchTerm(value: string): void {
    this.searchItem.set(value);
  }

  setSelectedStatus(status: 'all' | 'planned' | 'watching' | 'watched'): void {
    this.selectedStatus.set(status);
  }

  clearItems(): void {
    this.items.set([]);
  }
}
