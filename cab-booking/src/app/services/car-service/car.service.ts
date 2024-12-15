import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../enviroments/environment';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  API_URL = environment.API_URL
  constructor(private http: HttpClient, private auth: AuthService) {}
  getcardetails(){
    return this.auth.mockData$
  }

  setcardetails(carData: {registrationnumber:string, brand: string,model:string}){
    let id = localStorage.getItem('id');
    let currentArray = this.auth.mockData.value;
    let updatedArray = currentArray.map((obj:any)=>{
      return obj.id == id ? {...obj, ...carData} : obj
    })
    this.auth.mockData.next(updatedArray)
  }
  
}
