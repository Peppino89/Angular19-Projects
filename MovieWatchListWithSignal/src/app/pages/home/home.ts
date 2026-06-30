import { Component } from '@angular/core';
import { WatchItemForm } from '../../components/watch-item-form/watch-item-form';

@Component({
  selector: 'app-home',
  imports: [WatchItemForm],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
