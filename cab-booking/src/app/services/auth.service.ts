import { Injectable } from '@angular/core';
import { Login } from '../login/loginInterface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}



  isLoggedIn(){
    let authToken = localStorage.getItem('token')
    return !!authToken
  }

  login(userData:any){
    //api call
    return true;

  }

  getToken(){
    return localStorage.getItem('token')
  }
}
