import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  isLoggedIn(){
    let authToken = localStorage.getItem('token')
    return !!authToken
  }
}
