import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  imports: [CommonModule, ReactiveFormsModule],
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

  ngOnInit() {
    const params = this.route.snapshot.queryParams;
    if (params['sessionExpired'] === 'true') {
      this.sessionExpired = true;
    }
  }

login() {
  const user = this.loginForm.value.user!;
  const pass = this.loginForm.value.pass!;

  console.log('LOGIN CLICKED', user, pass);

  this.auth.login(user, pass).subscribe({
    next: (res) => {
      console.log('LOGIN SUCCESS', res);
      this.router.navigate(['/employees']);
    },
    error: (err) => {
      console.log('LOGIN ERROR', err);
      this.error = 'Invalid credentials';
    }
  });
}


}
