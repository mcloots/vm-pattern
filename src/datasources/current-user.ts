import { Injectable } from '@angular/core';
import { startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private currentUserSubject = new Subject<string>();
  currentUser$ = this.currentUserSubject
    .asObservable()
    .pipe(startWith('anonymous'));

  changeUser(name: string) {
    console.log('change user!', name);
    this.currentUserSubject.next(name);
  }
}
