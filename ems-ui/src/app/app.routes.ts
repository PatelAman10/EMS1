import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Employees } from './pages/employees/employees';
import { AddEmployee } from './pages/add-employee/add-employee';
import { EditEmployee } from './pages/edit-employee/edit-employee';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'employees', component: Employees, canActivate: [AuthGuard] },
  { path: 'add-employee', component: AddEmployee, canActivate: [AuthGuard] },
  { path: 'edit-employee/:id', component: EditEmployee, canActivate: [AuthGuard] }
];
