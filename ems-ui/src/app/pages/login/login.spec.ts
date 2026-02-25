import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

describe('Login Component (Jasmine + Karma)', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockAuthService: any;
  let mockRouter: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // 1. Setup Mock services
    mockAuthService = {
      login: jasmine.createSpy('login')
    };
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    mockActivatedRoute = {
      snapshot: {
        queryParams: {}
      }
    };

    // 2. Configure Testing Module
    await TestBed.configureTestingModule({
      // For Standalone Components, we MUST use 'imports' instead of 'declarations'
      imports: [
        Login, 
        CommonModule, 
        ReactiveFormsModule, 
        FormsModule
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    
    // We don't call detectChanges here yet so we can modify 
    // mockActivatedRoute in specific tests before ngOnInit runs
  });

  it('should create the component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should call auth.login on login()', () => {
    fixture.detectChanges();
    component.loginForm.setValue({ user: 'admin', pass: '1234' });
    mockAuthService.login.and.returnValue(of({}));
// 
    component.login();

    expect(mockAuthService.login).toHaveBeenCalledWith('admin', '1234');
  });

  it('should navigate to employees on successful login', () => {
    fixture.detectChanges();
    component.loginForm.setValue({ user: 'admin', pass: '1234' });
    mockAuthService.login.and.returnValue(of({}));

    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/employees']);
  });

  it('should set error message on failed login', () => {
    fixture.detectChanges();
    component.loginForm.setValue({ user: 'admin', pass: 'wrong' });
    mockAuthService.login.and.returnValue(throwError(() => new Error('error')));

    component.login();

    expect(component.error).toBe('Invalid credentials');
  });

  it('should set sessionExpired to true if query param exists', () => {
    // Modify mock before ngOnInit (triggered by detectChanges)
    mockActivatedRoute.snapshot.queryParams = { sessionExpired: 'true' };
    
    fixture.detectChanges(); 

    expect(component.sessionExpired).toBeTrue();
  });

  it('should not call login service if form is invalid', () => {
    fixture.detectChanges();
    component.loginForm.setValue({ user: '', pass: '' });

    component.login();

    expect(mockAuthService.login).not.toHaveBeenCalled();
  });
}); 