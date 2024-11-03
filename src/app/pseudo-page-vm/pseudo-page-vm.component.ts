import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  BehaviorSubject,
  combineLatest,
  interval,
  map,
  startWith,
  switchMap
} from 'rxjs';
import { TodoListService } from '../../datasources/todo-list';
import { CurrentUserService } from '../../datasources/current-user';

@Component({
  selector: 'app-pseudo-page-vm',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pseudo-page-vm.component.html',
  styleUrl: './pseudo-page-vm.component.css',
})
export class PseudoPageVmComponent {
  private readonly todoService = inject(TodoListService);
  private readonly currentUserService = inject(CurrentUserService);
  private currentPageSubject = new BehaviorSubject<number>(1);
  readonly currentPage$ = this.currentPageSubject.asObservable();

  private readonly loggedTime$ = interval(1000);
  private readonly todoList$ = this.currentPage$.pipe(
    switchMap((page) => this.todoService.getTodos(page, 10))
  );

  readonly vm$ = combineLatest([
    this.loggedTime$.pipe(
      map((time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return [minutes, ('0' + seconds).slice(-2)];
      }),
      map((time) => time.join(':')),
      startWith(0)
    ),
    this.currentPage$,
    this.currentUserService.currentUser$,
    this.todoList$.pipe(startWith([])),
  ]).pipe(
    map(([loggedTime, currentPage, currentUser, todoList]) => {
      return {
        loggedTime,
        currentPage,
        currentUser,
        todoList,
      };
    })
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
