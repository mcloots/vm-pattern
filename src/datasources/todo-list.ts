import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, startWith } from 'rxjs';

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type TodoListObservable = (
  page: number,
  limit: number
) => Observable<Todo[]>;

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private httpClient = inject(HttpClient);

  getTodos(page: number = 0, _limit: number = 10) {
    const _start = (page - 1) * _limit;
    return this.httpClient
      .get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`, {
        params: {
          _start,
          _limit,
        },
      })
      .pipe(startWith([]));
  }
}

export const todoList$: () => TodoListObservable = () => {
  const httpClient = inject(HttpClient);

  return (page: number = 0, _limit: number = 10) => {
    const _start = (page - 1) * _limit;
    return httpClient
      .get<Todo[]>(`https://jsonplaceholder.typicode.com/todos`, {
        params: {
          _start,
          _limit,
        },
      })
      .pipe(startWith([]));
  };
};
