import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { provideHttpClient } from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { of } from 'rxjs/internal/observable/of';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['addData']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the register form with empty values', () => {
    const formValues = component.registerForm.value;
    expect(formValues.username).toBe('');
    expect(formValues.usertype).toBe('');
    expect(formValues.password).toBe('');
    expect(formValues.confirmPassword).toBe('');
  });

  it('should validate required fields', () => {
    const usernameControl = component.registerForm.get('username');
    const usertypeControl = component.registerForm.get('usertype');
    const passwordControl = component.registerForm.get('password');
    const confirmPasswordControl = component.registerForm.get('confirmPassword');

    usernameControl?.setValue('');
    usertypeControl?.setValue('');
    passwordControl?.setValue('');
    confirmPasswordControl?.setValue('');

    expect(usernameControl?.hasError('required')).toBeTrue();
    expect(usertypeControl?.hasError('required')).toBeTrue();
    expect(passwordControl?.hasError('required')).toBeTrue();
    expect(confirmPasswordControl?.hasError('required')).toBeTrue();
  });

  it('should validate password minimum length', () => {
    const passwordControl = component.registerForm.get('password');

    passwordControl?.setValue('12345');

    expect(passwordControl?.hasError('minlength')).toBeTrue();
  });

  it('should validate password and confirmPassword mismatch', () => {
    component.registerForm.patchValue({ password: 'Password123', confirmPassword: 'Different123' });

    const confirmPasswordControl = component.registerForm.get('confirmPassword');
    expect(confirmPasswordControl?.hasError('passwordMismatch')).toBeTrue();
  });

  it('should call AuthService.addData on valid form submission', () => {
    const mockResponse = of({});
    mockAuthService.addData.and.returnValue(mockResponse);

    component.registerForm.patchValue({
      username: 'testuser',
      usertype: 'user',
      password: 'Password123',
      confirmPassword: 'Password123'
    });

    component.onSubmit();

    expect(mockAuthService.addData).toHaveBeenCalledWith({
      username: 'testuser',
      usertype: 'user',
      password: 'Password123',
      confirmPassword: 'Password123'
    });
  });

  it('should navigate to login page on successful registration', () => {
    const mockResponse = of({});
    mockAuthService.addData.and.returnValue(mockResponse);

    component.registerForm.patchValue({
      username: 'testuser',
      usertype: 'user',
      password: 'Password123',
      confirmPassword: 'Password123'
    });

    component.onSubmit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show an alert if the user already exists', () => {
    spyOn(window, 'alert');
    const mockError = { status: 409 };
    mockAuthService.addData.and.returnValue(throwError(() => mockError));

    component.registerForm.patchValue({
      username: 'testuser',
      usertype: 'user',
      password: 'Password123',
      confirmPassword: 'Password123'
    });

    component.onSubmit();

    expect(window.alert).toHaveBeenCalledWith('user already exists');
  });
});
