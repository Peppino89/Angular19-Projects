import { Component } from '@angular/core';
import { WatchlistSignalService } from '../../services/watchlist-signal.service';
import CreateWatchItemDto from '../../dtos/create-watch-item.dto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-watch-item-form',
  imports: [FormsModule],
  templateUrl: './watch-item-form.html',
  styleUrl: './watch-item-form.css',
})
export class WatchItemForm {
  title: string = '';
  genre: string = '';
  type: 'movie' | 'series' = 'movie';
  status: 'planned' | 'watching' | 'watched' = 'planned';
  rating: number | null = null;

  constructor(private watchlistService: WatchlistSignalService) {}

  onSubmit(): void {
    const trimmedTitle: string = this.title.trim();
    const trimmedGenre: string = this.genre.trim();

    if (!trimmedTitle || !trimmedGenre || !this.rating || this.rating < 1 || this.rating > 5) {
      return;
    }

    const dto: CreateWatchItemDto = {
      title: trimmedTitle,
      genre: trimmedGenre,
      type: this.type,
      status: this.status,
      rating: this.rating,
    };

    this.watchlistService.addItem(dto);
    this.resetForm();
  }

  private resetForm(): void {
    this.title = '';
    this.genre = '';
    this.type = 'movie';
    this.status = 'planned';
    this.rating = null;
  }
}
