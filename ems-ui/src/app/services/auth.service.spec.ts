import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('AuthService Unit Tests', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  const apiUrl = 'http://localhost:5136/api/auth';

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  // ✅ Service creation
  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  // ✅ Login API call
  it('should call login API and store token', () => {
    const mockResponse = { token: 'abc123' };

    spyOn(service, 'startSession');

    service.login('admin', '1234').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: 'admin',
      password: '1234'
    });

    req.flush(mockResponse);

    expect(localStorage.getItem('token')).toBe('abc123');
    expect(service.startSession).toHaveBeenCalled();
  });

  // ✅ Login error handling
  it('should handle login error', () => {
    service.login('admin', 'wrong').subscribe({
      next: () => fail('Should fail'),
      error: (error) => {
        expect(error.status).toBe(401);
      }
    });

    const req = httpMock.expectOne(`${apiUrl}/login`);
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  // ✅ Logout
  it('should clear token and set loggedIn false on logout', () => {
    localStorage.setItem('token', 'abc123');

    service.logout();

    expect(localStorage.getItem('token')).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
  });

  // ✅ isLoggedIn
  it('should return true after startSession()', () => {
    service.startSession();
    expect(service.isLoggedIn()).toBeTrue();
  });

  // ✅ getToken
  it('should return token from localStorage', () => {
    localStorage.setItem('token', 'xyz789');
    expect(service.getToken()).toBe('xyz789');
  });
});
