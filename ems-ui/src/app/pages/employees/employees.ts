
 /*  import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.html',
  styleUrl: './employees.css',

  imports: [CommonModule],
})
export class Employees implements OnInit {
  private empService = inject(EmployeeService);
  private auth = inject(AuthService);
  private router = inject(Router);

  employees: Employee[] = [];
  countdown$ = this.auth.countdown$; // keep countdown as-is

  ngOnInit() {
    this.loadEmployees();
  }

  // inside loadEmployees()
loadEmployees() {
  this.empService.getEmployees().subscribe({
    next: (data) => {
      this.employees = data;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    error: (err) => console.error('Failed to load employees', err),
  });
}


  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({
      next: () => this.loadEmployees(),
      error: (err) => console.error('Delete failed', err),
    });
  }

  goToAdd() {
    this.router.navigate(['/add-employee']);
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit-employee', id]);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
 */

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.html',
  styleUrl: './employees.css',
  imports: [CommonModule, FormsModule],
})
export class Employees implements OnInit {
  private empService = inject(EmployeeService);
  private auth = inject(AuthService);
  private router = inject(Router);

  employees: Employee[] = [];
  countdown$ = this.auth.countdown$;

  // Theme state
  currentTheme = 'light'; // bound to select via ngModel

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Failed to load employees', err),
    });
  }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id).subscribe({ next: () => this.loadEmployees() });
  }

  goToAdd() { this.router.navigate(['/add-employee']); }
  editEmployee(id: number) { this.router.navigate(['/edit-employee', id]); }
  logout() { this.auth.logout(); this.router.navigate(['/login']); }
}
