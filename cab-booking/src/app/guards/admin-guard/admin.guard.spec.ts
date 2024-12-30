import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth-service/auth.service';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let alertSpy: jasmine.Spy;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['getUserType']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    alertSpy = spyOn(window, 'alert');

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    });
  });

  it('should allow access when user type is "admin"', () => {
    mockAuthService.getUserType.and.returnValue('admin');

    const result = adminGuard(null as any, null as any);

    expect(result).toBeTrue();
    expect(mockAuthService.getUserType).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
    expect(alertSpy).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to "/navbar/home" when user type is not "admin"', () => {
    mockAuthService.getUserType.and.returnValue('user');

    const result = adminGuard(null as any, null as any);

    expect(result).toBeFalse();
    expect(mockAuthService.getUserType).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/navbar/home']);
    expect(alertSpy).toHaveBeenCalledWith('You are not allowed to this page');
  });

  it('should inject AuthService and Router correctly', () => {
    // This test indirectly ensures that the dependencies are correctly injected
    expect(() => adminGuard(null as any, null as any)).not.toThrow();
  });
});
