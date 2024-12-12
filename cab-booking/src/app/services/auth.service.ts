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
    return true? authToken!='' || authToken!=undefined : false
  }

  login(userData:any){
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((data)=>{console.log(data);
    })
    return true;

  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserDetails(){
    return {username: 'test1', email: 'test123@gmail.com', name: 'testcase'}
  }

  setUserDetails(userData: {name:string, username: string, email: string}){
    //api call
    
  }
}
