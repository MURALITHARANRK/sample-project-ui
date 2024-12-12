import { Injectable } from '@angular/core';
import { Login } from '../Interfaces/loginInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  setLocalStorage(token:any){
    localStorage.setItem('token', token)
  }

  isLoggedIn(){
    let authToken = localStorage.getItem('token')
    return !!authToken
  }

  login(userData:any){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data)=>{console.log(data);
    })
    return true;

  }

  getToken(){
    return localStorage.getItem('token')
  }
}
