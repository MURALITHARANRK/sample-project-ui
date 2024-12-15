import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const driverGuard: CanActivateFn = (route, state) => {

    const service = inject(AuthService)
  
    const router = inject(Router)
    
    if(service.getUserType() !='driver'){
      alert('You are not allowed to this page')
      router.navigate(['/navbar/home'])
      return false;
    }

  return true;
};
