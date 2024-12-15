import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  
  const service = inject(AuthService)

  const router = inject(Router)
  
  if(service.getUserType() !='user'){
    alert('You are not allowed to this page')
    router.navigate(['/navbar/home'])
    return false;
  }

  return true;
};
