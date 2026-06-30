import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() itemAdded = new EventEmitter<CreateWatchItemDto>();

  onSubmit(): void {
    const trimmedTitle = this.title.trim();
    const trimmedGenre = this.genre.trim();

    if (!trimmedTitle || !trimmedGenre || !this.rating || this.rating < 1 || this.rating > 5) {
      return;
    }
    const createWatchItemDto: CreateWatchItemDto = {
      title: trimmedTitle,
      genre: trimmedGenre,
      type: this.type,
      status: this.status,
      rating: this.rating,
    };

    this.itemAdded.emit(createWatchItemDto);
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
