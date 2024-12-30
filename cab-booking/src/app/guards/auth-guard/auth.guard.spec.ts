import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when the user is logged in', () => {
    // Simulate the user being logged in
    mockAuthService.isLoggedIn.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard(null as any, null as any));

    expect(result).toBeTrue();
    expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to "/login" when the user is not logged in', () => {
    // Simulate the user not being logged in
    mockAuthService.isLoggedIn.and.returnValue(false);

    // Spy on the alert function
    spyOn(window, 'alert');

    const result = TestBed.runInInjectionContext(() => authGuard(null as any, null as any));

    expect(result).toBeFalse();
    expect(mockAuthService.isLoggedIn).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
    expect(window.alert).toHaveBeenCalledWith('login properly');
  });
});
