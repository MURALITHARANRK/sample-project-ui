import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Car } from '../../models/carModel';
import { User } from '../../models/userDataModel';
import { Driver } from '../../models/driverModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URL  = environment.API_URL

  constructor(private auth: AuthService, private http: HttpClient) { }

    mockCarData: BehaviorSubject<any>= new BehaviorSubject<any>([
      { id: 1, registrationnumber: 'ABC123', brand: 'Toyota', model: 'Camry' },
      { id: 1, registrationnumber: 'XYZ987', brand: 'Honda', model: 'Civic' },
      { id: 1, registrationnumber: 'DEF456', brand: 'Ford', model: 'Focus' },
      { id: 2, registrationnumber: 'GHI789', brand: 'Chevrolet', model: 'Malibu' },
      { id: 2, registrationnumber: 'JKL012', brand: 'Nissan', model: 'Altima' },
      { id: 2, registrationnumber: 'MNO345', brand: 'Hyundai', model: 'Elantra' },
      { id: 3, registrationnumber: 'PQR678', brand: 'Volkswagen', model: 'Passat' },
      { id: 3, registrationnumber: 'STU901', brand: 'Mazda', model: '6' },
      { id: 3, registrationnumber: 'VWX234', brand: 'Subaru', model: 'Impreza' },
      { id: 4, registrationnumber: 'YZA567', brand: 'Kia', model: 'Optima' },
    ]);

    mockCarData$ : Observable<any> = this.mockCarData.asObservable()

  mockDriverData=[{
    "id":1,
    "username":'Alex'
    },
    {
    "id":2,
    "username":'Gerorge'
    },
    {
      "id":3,
      "username":'Jack'
    },
    {
      "id":4,
      "username":'John'
    },
  ];

  getCarDetailsById(id: string) {
    return this.http.get<Car[]>(this.API_URL+'car/driver/'+id)
  }

  getAllUsers(){
    // return this.auth.mockData$
    return this.http.get<User[]>(this.API_URL+'admin/users')
  }

  getAllBooking(){
    return this.http.get(this.API_URL)
  }

  getDriverDetails(){
    // return this.mockDriverData;
    return this.http.get<Driver[]>(this.API_URL+'admin/driver')
 }

 setCarDetails(carData: Car) {
    return this.http.post(this.API_URL+'admin/create',carData)
}

}
