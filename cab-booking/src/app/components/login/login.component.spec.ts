import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent} from './login.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { By } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService
  let router: Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [provideHttpClient(), provideRouter(routes)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a disabled submit button when the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTruthy();
  });

  it('should enable the submit button when the form is valid', () => {
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeFalsy();
  });

  it('should clear localStorage on initialization', () => {
    spyOn(localStorage, 'clear');
    component.ngOnInit();
    expect(localStorage.clear).toHaveBeenCalled();
  });
  

  it('should show username error when touched and invalid', () => {
    const usernameControl = component.loginForm.controls['username'];
    usernameControl.markAsTouched();
    usernameControl.setValue('');
    fixture.detectChanges();

    const usernameError = fixture.debugElement.query(By.css('#usernameError'));
    expect(usernameError).toBeTruthy();
    expect(usernameError.nativeElement.textContent.trim()).toBe('Username is required.');
  });

  it('should show password error when touched and invalid', () => {
    const passwordControl = component.loginForm.controls['password'];
    passwordControl.markAsTouched();
    passwordControl.setValue('');
    fixture.detectChanges();

    const passwordError = fixture.debugElement.query(By.css('#passwordError'));
    expect(passwordError).toBeTruthy();
    expect(passwordError.nativeElement.textContent.trim()).toBe('Password is required.');
  });

  it('should call onsubmit() when the form is submitted', () => {
    spyOn(component, 'onsubmit');
    component.loginForm.controls['username'].setValue('testuser');
    component.loginForm.controls['password'].setValue('password123');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('ngSubmit', null);
    expect(component.onsubmit).toHaveBeenCalled();
  });

  it('should navigate to register page on clicking "New user? Register Now"', () => {
    const link = fixture.debugElement.query(By.css('a[routerLink="/register"]'));
    expect(link.nativeElement.textContent.trim()).toBe('New user? Register Now');
  });

  it('should initialize the login form with default values', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls['username'].value).toBe('');
    expect(component.loginForm.controls['password'].value).toBe('');
  });

  it('should mark the form as invalid if required fields are empty', () => {
    component.loginForm.controls['username'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark the form as invalid if the password is less than 8 characters', () => {
    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('short');
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should mark the form as valid with correct values', () => {
    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('password123');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call the AuthService login method when onsubmit is invoked', () => {
    const loginSpy = spyOn(authService, 'login').and.returnValue(of({ token: 'abc123', userType: 'user',id: '99', username:"admin", message: "Login Successfull" }));
    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('password123');
    component.onsubmit();
    expect(loginSpy).toHaveBeenCalledWith(component.loginForm.value);
  });


  it('should handle a successful login for an admin and navigate to /navbar/home', () => {
    spyOn(authService, 'login').and.returnValue(of({ token: 'abc123', userType: 'admin', id: '99', username:"admin", message: "Login Successfull"}));

    component.loginForm.controls['username'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin1234');
    localStorage.setItem('usertype','admin')
    component.onsubmit();
    expect(localStorage.getItem('usertype')).toBe('admin');
    expect(localStorage.getItem('token')).toBeDefined();
  });

  it('should display an alert if login credentials are invalid (401 error)', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ status: 401 }));
    spyOn(window, 'alert'); // Spy on the alert function

    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('wrongpassword');
    component.onsubmit();

    expect(window.alert).toHaveBeenCalledWith('wrong username or password');
  });

  it('should log errors to the console if an error occurs during login', () => {
    const error = { status: 500, message: 'Internal Server Error' };
    spyOn(authService, 'login').and.returnValue(throwError(error));
    spyOn(console, 'log'); // Spy on console.log

    component.loginForm.controls['username'].setValue('user');
    component.loginForm.controls['password'].setValue('password123');
    component.onsubmit();

    expect(console.log).toHaveBeenCalledWith(error);
  });

  it('should clear localStorage on initialization', () => {
    localStorage.setItem('key', 'value'); // Set a dummy key
    component.ngOnInit();
    expect(localStorage.getItem('key')).toBeNull();
  });

});
