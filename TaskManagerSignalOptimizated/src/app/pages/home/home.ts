import { Component } from '@angular/core';
import { TaskForm } from '../../components/task-form/task-form';
import { TaskFilter } from '../../components/task-filter/task-filter';
import { TaskStats } from '../../components/task-stats/task-stats';
import { TaskList } from '../../components/task-list/task-list';

@Component({
  selector: 'app-home',
  imports: [TaskForm, TaskFilter, TaskStats, TaskList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
