import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, timer, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:5136/api/auth';

  private readonly sessionDurationMs = 30 * 1000; // 30 seconds
  private readonly warningSeconds = 7;

  private loggedIn = false;
  private timerSub: Subscription | null = null;

  private countdownSubject = new BehaviorSubject<number | null>(null);
  countdown$ = this.countdownSubject.asObservable();

  private sessionExpiredSubject = new BehaviorSubject(false);
  sessionExpired$ = this.sessionExpiredSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.sessionExpired$.subscribe((expired) => {
      if (expired) {
        this.logout();
        this.router.navigate(['/login'], { queryParams: { sessionExpired: 'true' } });
      }
    });

    this.setupActivityListener();
  }

  login(user: string, pass: string) {
  return this.http.post<{ token: string }>(`${this.apiUrl}/login`, {
    username: user,
    password: pass,
  }).pipe(
    tap(response => {
      // Store JWT token in local storage
      localStorage.setItem('token', response.token);

      // Start session countdown
      this.startSession();
    })
  );
}


  startSession() {
    this.loggedIn = true;
    this.sessionExpiredSubject.next(false);
    this.startTimer();
  }

  logout() {
    this.loggedIn = false;
    this.countdownSubject.next(null);
    this.sessionExpiredSubject.next(false);
    localStorage.removeItem('token');

    if (this.timerSub) {
      this.timerSub.unsubscribe();
      this.timerSub = null;
    }
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  resetTimer() {
    if (this.loggedIn) {
      this.startTimer();
    }
  }

  private startTimer() {
    // stop old timer
    if (this.timerSub) {
      this.timerSub.unsubscribe();
    }

    const startTime = Date.now();

    this.timerSub = timer(0, 1000)
      .pipe(
        tap(() => {
          const elapsed = Date.now() - startTime;
          const remainingSeconds = Math.max(
            0,
            Math.ceil((this.sessionDurationMs - elapsed) / 1000)
          );

          this.countdownSubject.next(
            remainingSeconds <= this.warningSeconds ? remainingSeconds : null
          );

          if (remainingSeconds <= 0) {
            this.sessionExpiredSubject.next(true);
          }
        })
      )
      .subscribe();
  }

  private setupActivityListener() {
    const activity$ = merge(
      fromEvent(window, 'click'),
      fromEvent(window, 'keydown'),
      fromEvent(window, 'mousemove')
    );

    activity$.subscribe(() => {
      this.resetTimer();
    });
  }
  getToken(): string | null {
  return localStorage.getItem('token');
}

}
