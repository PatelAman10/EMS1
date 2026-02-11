import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  private auth = inject(AuthService);

  constructor() {
    // This makes sure session expiry works globally
    this.auth.sessionExpired$.subscribe((expired) => {
      if (expired) {
        this.auth.logout();
      }
    });
  }
}
