import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AuthService } from '../auth-service/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  API_URL = environment.API_URL
  constructor(private http: HttpClient, private auth: AuthService) {}

  mockCarData:BehaviorSubject<any> = new BehaviorSubject( [
    { id: 1, regno: 'ABC123', brand: 'Toyota', model: 'Camry' },
    { id: 2, regno: 'XYZ987', brand: 'Honda', model: 'Civic' },
    { id: 3, regno: 'DEF456', brand: 'Ford', model: 'Focus' },
    { id: 4, regno: 'GHI789', brand: 'Chevrolet', model: 'Malibu' },
    { id: 5, regno: 'JKL012', brand: 'Nissan', model: 'Altima' },
    { id: 6, regno: 'MNO345', brand: 'Hyundai', model: 'Elantra' },
    { id: 7, regno: 'PQR678', brand: 'Volkswagen', model: 'Passat' },
    { id: 8, regno: 'STU901', brand: 'Mazda', model: '6' },
    { id: 9, regno: 'VWX234', brand: 'Subaru', model: 'Impreza' },
    { id: 10, regno: 'YZA567', brand: 'Kia', model: 'Optima' },
  ]);

  mockCarData$: Observable<any> = this.mockCarData.asObservable()

  getCarDetails(){
    return this.auth.mockData$
  }
  getCarData(){
    // return this.mockCarData
    return this.http.get(this.API_URL+'user/available')
  }

  getBookingDetails(id:any){
    return this.http.get(this.API_URL+'car/booking?carid='+id)
  }
  
}
