import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  BehaviorSubject,
  debounceTime,
  interval,
  switchMap
} from 'rxjs';
import { TodoListService } from '../../datasources/todo-list';
import { CurrentUserService } from '../../datasources/current-user';

@Component({
  selector: 'app-pseudo-page',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pseudo-page.component.html',
  styleUrl: './pseudo-page.component.css',
})
export class PseudoPageComponent {
  private readonly todoService = inject(TodoListService);
  private currentPageSubject = new BehaviorSubject<number>(1);
  readonly currentPage$ = this.currentPageSubject.asObservable();
  readonly currentUser$ = inject(CurrentUserService).currentUser$;

  readonly loggedTime$ = interval(1000);
  readonly todoList$ = this.currentPage$.pipe(
    //debounceTime(300),
    switchMap((page) => this.todoService.getTodos(page, 10))
  );

  prevPage() {
    this.currentPageSubject.next(
      this.currentPageSubject.value - 1 < 1
        ? 1
        : this.currentPageSubject.value - 1
    );
  }
  nextPage() {
    this.currentPageSubject.next(
      this.currentPageSubject.value + 1 > 10
        ? 10
        : this.currentPageSubject.value + 1
    );
  }
}
