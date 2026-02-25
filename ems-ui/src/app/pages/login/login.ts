import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrl: './login.css',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  loginForm = this.fb.group({
    user: ['', Validators.required],
    pass: ['', Validators.required],
  });

  error = '';
  sessionExpired = false;

  // Theme state
  currentTheme: 'light' | 'dark' | 'colorful' = 'light';

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if (params['sessionExpired'] === 'true') {
      this.sessionExpired = true;
    }
  }

  login() {
    if (this.loginForm.invalid) {
    return;
  }
    const user = this.loginForm.value.user!;
    const pass = this.loginForm.value.pass!;

    this.auth.login(user, pass).subscribe({
      next: (res) => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = 'Invalid credentials';
      },
    });
  }
}
