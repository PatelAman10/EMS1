import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  templateUrl: './edit-employee.html',
  imports: [CommonModule, ReactiveFormsModule]
})
export class EditEmployee {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  employeeId = Number(this.route.snapshot.paramMap.get('id'));

  employeeForm = this.fb.group({
    name: ['', Validators.required],
    role: ['', Validators.required]
  });

  constructor(
    private empService: EmployeeService,
    private router: Router
  ) {
    const emp = this.empService.getEmployee(this.employeeId);

    // Pre-fill the form
    if (emp) {
      this.employeeForm.patchValue({
        name: emp.name,
        role: emp.role
      });
    }
  }

  update() {
    this.empService.updateEmployee(this.employeeId, this.employeeForm.value as any);
    this.router.navigate(['/employees']);
  }
}
