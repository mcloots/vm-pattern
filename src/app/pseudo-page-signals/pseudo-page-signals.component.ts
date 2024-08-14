import { Component, computed, inject, signal } from '@angular/core';
import { interval } from 'rxjs';
import { TodoListSignalsService } from '../../datasources/todo-list-signals';
import { CurrentUserSignalsService } from '../../datasources/current-user-signals';

@Component({
  selector: 'app-pseudo-page-signals',
  standalone: true,
  imports: [],
  templateUrl: './pseudo-page-signals.component.html',
  styleUrl: './pseudo-page-signals.component.css'
})
export class PseudoPageSignalsComponent {
  private readonly todoService = inject(TodoListSignalsService);
  private readonly currentUserService = inject(CurrentUserSignalsService);

  // Signal for logged time in seconds
  readonly loggedTime = signal(0);

  // Interval effect to update the logged time every second
  constructor() {
    interval(1000).subscribe(() => this.loggedTime.update(time => time + 1));
  }

  // Computed signal to format logged time as MM:SS
  readonly formattedLoggedTime = computed(() => {
    const minutes = Math.floor(this.loggedTime() / 60);
    const seconds = this.loggedTime() % 60;
    return `${minutes}:${('0' + seconds).slice(-2)}`;
  });

  // Computed signals to access the todos, currentPage, etc.
  readonly todoList = computed(() => this.todoService.todos());
  readonly currentPage = computed(() => this.todoService.currentPage());

  // Computed signal to combine all view model data
  readonly vm = computed(() => ({
    loggedTime: this.formattedLoggedTime(),
    currentPage: this.currentPage(),
    currentUser: this.currentUserService.currentUserName,
    todoList: this.todoList,
  }));

  // Methods to navigate between pages
  prevPage() {
    const page = this.currentPage();
    this.todoService.setPage(Math.max(1, page - 1));
  }

  nextPage() {
    const page = this.currentPage();
    this.todoService.setPage(Math.min(10, page + 1));
  }
}
