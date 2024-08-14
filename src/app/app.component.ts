import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PseudoPageComponent } from './pseudo-page/pseudo-page.component';
import { PseudoPageSignalsComponent } from './pseudo-page-signals/pseudo-page-signals.component';
import { CurrentUserSignalsService } from '../datasources/current-user-signals';
import { CurrentUserService } from '../datasources/current-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PseudoPageComponent, PseudoPageSignalsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private currentUserService = inject(CurrentUserService);
  private currentUserSignalsService = inject(CurrentUserSignalsService);

  changeUser() {
    this.currentUserService.changeUser(
      this.randomFromArray(['Adam', 'Another Adam', 'Test Adam'])
    );
  }

  logout() {
    this.currentUserService.changeUser('anonymous');
  }

  changeUserSignal() {
    this.currentUserSignalsService.changeUser(
      this.randomFromArray(['Adam', 'Another Adam', 'Test Adam'])
    );
  }

  logoutSignal() {
    this.currentUserSignalsService.changeUser('anonymous');
  }

  randomFromArray = <T>(arr: T[]) =>
    arr[Math.floor(Math.random() * arr.length)];
}
