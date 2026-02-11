import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  templateUrl: './employees.html',
  imports: [CommonModule],
})
export class Employees {
  private empService = inject(EmployeeService);
  private auth = inject(AuthService);
  private router = inject(Router);

  employees$ = this.empService.employees$;
  countdown$ = this.auth.countdown$;

  goToAdd() {
    this.router.navigate(['/add-employee']);
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit-employee', id]);
  }

  deleteEmployee(id: number) {
    this.empService.deleteEmployee(id);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
