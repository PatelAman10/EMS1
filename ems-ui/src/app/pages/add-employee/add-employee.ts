import { Location } from '@angular/common';  // <-- add this import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ]
})
export class AddEmployee {
  private fb = inject(FormBuilder);
  private location = inject(Location); // <-- added for back button

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(0)]]
  });

  currentTheme = 'light'; // <-- added for theme selector

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {}

  save() {
    if (this.employeeForm.valid) {
      const value = this.employeeForm.value;

      this.empService.addEmployee(value as Omit<Employee, 'id'>).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => console.error('Add failed', err)
      });
    }
  }

  goBack() {  // <-- added for back button
    this.location.back();
  }
}
