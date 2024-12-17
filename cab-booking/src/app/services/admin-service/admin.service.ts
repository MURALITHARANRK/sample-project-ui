import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private auth: AuthService) { }



  getAllUsers(){
    return this.auth.mockData$
  }

  getAllDrivers(){
    return this.auth.mockData$
  }

}
