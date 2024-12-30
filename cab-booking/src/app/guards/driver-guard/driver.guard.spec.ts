import { TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { driverGuard } from './driver.guard';

describe('driverGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUserType']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when user type is "driver"', () => {
    // Simulate the user being a driver
    mockAuthService.getUserType.and.returnValue('driver');

    const result = TestBed.runInInjectionContext(() => driverGuard(null as any, null as any));

    expect(result).toBeTrue();
    expect(mockAuthService.getUserType).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to "/navbar/home" when user type is not "driver"', () => {
    // Simulate the user not being a driver
    mockAuthService.getUserType.and.returnValue('user');

    // Spy on the alert function
    spyOn(window, 'alert');

    const result = TestBed.runInInjectionContext(() => driverGuard(null as any, null as any));

    expect(result).toBeFalse();
    expect(mockAuthService.getUserType).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/navbar/home']);
    expect(window.alert).toHaveBeenCalledWith('You are not allowed to this page');
  });
});

