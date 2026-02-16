import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class AddEmployee {
  private fb = inject(FormBuilder);

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    salary: [0, [Validators.required, Validators.min(0)]]
  });

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
}
