import { Component, inject, input, computed,OnInit, DestroyRef, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  sort = signal<'asc' | 'desc'>('desc');
  userId = input.required<string>();
  private  taskService = inject(TasksService)
  private destroyRef = inject(DestroyRef)
  private activateRoute = inject(ActivatedRoute);
  
  userTasks = computed(() => 
    this.taskService
  .allTasks()
  .filter((task) => task.userId === this.userId())
  .sort((a, b) => {
      if  (this.sort() === 'desc') {
        return a.id > b.id ? -1 : 1;
      } else {
        return a.id > b.id ? 1 : -1;
      }
    })
  );


  ngOnInit(): void {
    const subscription = this.activateRoute.queryParams.subscribe({
      next: (params) => (this.sort.set(params['sort'])), 
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
