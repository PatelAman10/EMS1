import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

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
    role: ['', Validators.required]
  });

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {}

  save() {
    this.empService.addEmployee(this.employeeForm.value as any);
    this.router.navigate(['/employees']);
  }
}
