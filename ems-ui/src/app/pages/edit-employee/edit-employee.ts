/* import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule   // ✅ Needed for routerLink
  ]
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
    if (this.employeeForm.valid) {
      const value = this.employeeForm.value as Employee;

      this.empService.updateEmployee(this.employeeId, value).subscribe(() => {
        this.router.navigate(['/employees']);
      });
    }
  }
}
 */

import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule]
})
export class EditEmployee implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private location = inject(Location);

  employeeId = Number(this.route.snapshot.paramMap.get('id'));

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    salary: [0, [Validators.required, Validators.min(0)]]
  });

  currentTheme = 'light'; // theme selector

  constructor(private empService: EmployeeService, private router: Router) {}

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

  goBack() {
    this.location.back();
  }
}
