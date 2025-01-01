import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AuthService } from '../auth-service/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Car } from '../../models/carModel';
import { Booking } from '../../models/bookingModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  API_URL = environment.API_URL
  constructor(private http: HttpClient, private auth: AuthService) {}

 getCarDetails(){
    return this.auth.mockData$
  }
  getCarData(){
    // return this.mockCarData
    return this.http.get<Car[]>(this.API_URL+'user/available')
  }

  getBookingDetails(id:number){
    return this.http.get<Booking[]>(this.API_URL+'car/booking?carid='+id)
  }

  acceptRide(carid:any){
    return this.http.put(this.API_URL+'car/accept?carid='+carid,'',{responseType:'text'})
  }
  
}
