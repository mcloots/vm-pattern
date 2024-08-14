import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class TodoListSignalsService {
  private httpClient = inject(HttpClient);

  // Signals for pagination state
  readonly currentPage = signal<number>(1);
  readonly todosPerPage = signal<number>(10);

  // Signal to store the fetched todo list
  readonly todos = signal<Todo[]>([]);

  constructor() {
    // Effect to fetch todos whenever page or limit changes
    effect(() => {
      const page = this.currentPage();
      const limit = this.todosPerPage();
      this.fetchTodos(page, limit);
    });
  }

  // Method to fetch todos from the API and update the todos signal
  private fetchTodos(page: number, limit: number) {
    const _start = (page - 1) * limit;

    this.httpClient
      .get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`, {
        params: {
          _start,
          _limit: limit,
        },
      })
      .subscribe((data) => this.todos.set(data));
  }

  // Methods to change the current page and limit
  setPage(page: number) {
    this.currentPage.set(page);
  }

  setTodosPerPage(limit: number) {
    this.todosPerPage.set(limit);
  }
}