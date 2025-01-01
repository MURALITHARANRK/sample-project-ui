import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
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

  it('should allow access when user type is "admin"', () => {
    mockAuthService.getUserType.and.returnValue('admin');

    const result = TestBed.runInInjectionContext(() => adminGuard(null as any, null as any));

    expect(result).toBeTrue();
    expect(mockAuthService.getUserType).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should deny access and navigate to "/navbar/home" when user type is not "admin"', () => {
    mockAuthService.getUserType.and.returnValue('user');

    const result = TestBed.runInInjectionContext(() => adminGuard(null as any, null as any));

    expect(result).toBeFalse();
    expect(mockAuthService.getUserType).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/navbar/home']);
  });
});
