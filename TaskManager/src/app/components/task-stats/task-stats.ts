import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.css',
})
export class TaskStats {
  @Input() totalTasks: number = 0;
  @Input() completedTasks: number = 0;
  @Input() pendingTasks: number = 0;
}
