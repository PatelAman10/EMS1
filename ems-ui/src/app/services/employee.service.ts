import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees = new BehaviorSubject<Employee[]>([
    { id: 1, name: 'MS Dhoni', role: 'Boss' },
    { id: 2, name: 'Virat Kohli', role: 'Manager' },
  ]);

  employees$ = this.employees.asObservable();

  addEmployee(emp: Omit<Employee, 'id'>) {
    const current = this.employees.value;
    const newEmp: Employee = {
      id: current.length + 1,
      ...emp,
    };
    this.employees.next([...current, newEmp]);
  }

  updateEmployee(id: number, data: Partial<Employee>) {
    const updated = this.employees.value.map((e) =>
      e.id === id ? { ...e, ...data } : e
    );
    this.employees.next(updated);
  }

  deleteEmployee(id: number) {
    const updated = this.employees.value.filter((e) => e.id !== id);
    this.employees.next(updated);
  }

  getEmployee(id: number) {
    return this.employees.value.find((e) => e.id === id);
  }
}
