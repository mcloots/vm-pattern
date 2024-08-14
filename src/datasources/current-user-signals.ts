import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserSignalsService {
  // Signal to store the current user name
  private readonly currentUser = signal<string>('anonymous');

  // Method to change the current user
  changeUser(name: string) {
    console.log('change user!', name);
    this.currentUser.set(name);  // Update the signal with the new user name
  }

  // Computed signal to expose the current user name as a public property
  get currentUserName() {
    return this.currentUser();
  }
}
