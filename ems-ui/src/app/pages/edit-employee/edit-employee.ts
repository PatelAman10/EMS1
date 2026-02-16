import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  templateUrl: './edit-employee.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditEmployee implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  employeeId = Number(this.route.snapshot.paramMap.get('id'));

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    salary: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.empService.getEmployee(this.employeeId).subscribe(emp => {
      this.employeeForm.patchValue({
        name: emp.name,
        role: emp.role,
        email: emp.email,
        salary: emp.salary
      });
    });
  }

  update() {
    const value = this.employeeForm.value;
    if (value.name && value.role && value.email && value.salary != null) {
      this.empService.updateEmployee(this.employeeId, value as Employee).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
