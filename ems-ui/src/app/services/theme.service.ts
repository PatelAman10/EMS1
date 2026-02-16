import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('light');
  currentTheme$ = this.themeSubject.asObservable();

  setTheme(theme: string) {
    this.themeSubject.next(theme);
    // optional: save in localStorage to persist on refresh
    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) this.themeSubject.next(saved);
  }
}
