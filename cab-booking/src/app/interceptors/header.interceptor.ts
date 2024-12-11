import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  let token = authService.getToken() as string
  const newReq = req.clone({
    headers: req.headers.set('X-token', token)
  })
  
  return next(req);
};
