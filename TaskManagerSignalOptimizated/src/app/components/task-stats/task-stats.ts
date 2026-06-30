import { Component } from '@angular/core';
import { TaskService } from '../../services/task-service';

@Component({
  selector: 'app-task-stats',
  imports: [],
  templateUrl: './task-stats.html',
  styleUrl: './task-stats.css',
})
export class TaskStats {
  constructor(public taskService: TaskService) {}

}
