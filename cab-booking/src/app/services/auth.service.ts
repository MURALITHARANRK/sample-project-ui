import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.API_URL

  constructor(private http: HttpClient) {}

  setLocalStorage(token:any){
    localStorage.setItem('token', token)
  }

  isLoggedIn(){
    let authToken = localStorage.getItem('token')
    return true? authToken!='' || authToken!=undefined : false
  }

  login(){  
    return this.http.get('http://localhost:4200/mockData.json')
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

  getUserType(){
    return localStorage.getItem('usertype')
  }

}
