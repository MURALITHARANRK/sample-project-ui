import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environments';

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
    return true? authToken!='' && authToken!=undefined : false
  }

  login(){  
    return this.http.get('http://localhost:4200/mockData.json')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserType(){
    return localStorage.getItem('usertype')
  }

}
