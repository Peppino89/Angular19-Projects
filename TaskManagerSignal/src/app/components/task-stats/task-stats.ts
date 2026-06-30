import { Component, input } from '@angular/core';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.css',
})
export class TaskStats {

  totalTasks = input.required<number>();
  completedTasks = input.required<number>();
  pendingTasks = input.required<number>();

}
