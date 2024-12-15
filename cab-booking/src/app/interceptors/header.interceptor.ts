import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  // const exludedUrls = ['/api/login', '/api/register', 'mockData.json']
  let isExcluded = req.url.includes('mockData.json')
  
  if(isExcluded){
    console.log("excluded urls")
    return next(req)
  }
  const authService = inject(AuthService)
  let token = authService.getToken() as string
  const newReq = req.clone({
    headers: req.headers.set('X-token', token)
  })
  console.log(newReq);
  
  return next(newReq);
};
