import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  const exludedUrls = ['/login', '/register', 'mockData.json']
  let isExcluded = exludedUrls.some(url => req.url.includes(url));
  
  if(isExcluded){
    console.log("excluded urls")
    return next(req)
  }
  const authService = inject(AuthService)
  let token = authService.getToken() as string
  const newReq = req.clone({
    headers: req.headers.set('X-token', token)
  })
  
  return next(newReq);
};
