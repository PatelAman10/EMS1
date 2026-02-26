/* import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employee } from '../models/employee.model';

describe('EmployeeService Unit Tests', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:5277/api/employees';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'John', email: 'john@test.com', role: 'Developer', salary: 50000 },
      { id: 2, name: 'Jane', email: 'jane@test.com', role: 'HR', salary: 40000 }
    ];

    service.getEmployees().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockEmployees);
  });

  it('should fetch employee by id', () => {
    const mockEmployee: Employee = {
      id: 1,
      name: 'John',
      email: 'john@test.com',
      role: 'Developer',
      salary: 50000
    };

    service.getEmployee(1).subscribe(data => {
      expect(data).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');

    req.flush(mockEmployee);
  });

  it('should add employee', () => {
    const newEmployee = {
      name: 'Alice',
      email: 'alice@test.com',
      role: 'Manager',
      salary: 60000
    };

    const mockResponse: Employee = {
      id: 3,
      ...newEmployee
    };

    service.addEmployee(newEmployee).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);

    req.flush(mockResponse);
  });

  it('should update employee', () => {
    const updatedData = {
      name: 'John Updated',
      email: 'john@test.com',
      role: 'Senior Developer',
      salary: 70000
    };

    const mockResponse: Employee = {
      id: 1,
      ...updatedData
    };

    service.updateEmployee(1, updatedData).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedData);

    req.flush(mockResponse);
  });

  it('should delete employee', () => {
    service.deleteEmployee(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });
}); */




import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employee } from '../models/employee.model';

describe('EmployeeService Unit Tests', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeService]
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all employees', () => {
    const mockEmployees: Employee[] = [
      { id: 1, name: 'John', email: 'john@test.com', role: 'Developer', salary: 50000 },
      { id: 2, name: 'Jane', email: 'jane@test.com', role: 'HR', salary: 40000 }
    ];

    service.getEmployees().subscribe(data => {
      expect(data).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne(req =>
      req.url.includes('/api/employees')
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });

  it('should fetch employee by id', () => {
    const mockEmployee: Employee = {
      id: 1,
      name: 'John',
      email: 'john@test.com',
      role: 'Developer',
      salary: 50000
    };

    service.getEmployee(1).subscribe(data => {
      expect(data).toEqual(mockEmployee);
    });

    const req = httpMock.expectOne(req =>
      req.url.endsWith('/1')
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockEmployee);
  });

  it('should add employee', () => {
    const newEmployee = {
      name: 'Alice',
      email: 'alice@test.com',
      role: 'Manager',
      salary: 60000
    };

    const mockResponse: Employee = {
      id: 3,
      ...newEmployee
    };

    service.addEmployee(newEmployee).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.url.includes('/api/employees')
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newEmployee);

    req.flush(mockResponse);
  });

  it('should update employee', () => {
    const updatedData = {
      name: 'John Updated',
      email: 'john@test.com',
      role: 'Senior Developer',
      salary: 70000
    };

    const mockResponse: Employee = {
      id: 1,
      ...updatedData
    };

    service.updateEmployee(1, updatedData).subscribe(data => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(req =>
      req.url.endsWith('/1')
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedData);

    req.flush(mockResponse);
  });

  it('should delete employee', () => {
    service.deleteEmployee(1).subscribe(response => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(req =>
      req.url.endsWith('/1')
    );

    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
