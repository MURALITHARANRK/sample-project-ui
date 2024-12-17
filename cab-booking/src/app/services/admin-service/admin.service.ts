import { Injectable } from '@angular/core';
import { AuthService } from '../auth-service/auth.service';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private auth: AuthService) { }

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

  getCarDetailsById(id: any): Observable<any[]> {
    return this.mockCarData$.pipe(
      map((cars:any) => {
        const filteredCars = cars.filter((car: any) => car.id == id);
        if (filteredCars.length === 0) {
          throw new Error(`No cars found for ID: ${id}`);
        }
        return filteredCars;
      }),
      catchError((error) => {
        console.error(error.message);
        return throwError(() => new Error(`Error fetching car details: ${error.message}`));
      })
    );
  }

  getAllUsers(){
    return this.auth.mockData$
  }

  getDriverDetails(){
    return this.mockDriverData;
 }

 setCarDetails(carData: { id: any; registrationnumber: string; brand: string; model: string }) {
  try {
    const updatedCars = [...this.mockCarData.value, carData];
    this.mockCarData.next(updatedCars);
  } catch (error:any) {
    console.error('Error adding car details:', error.message);
  }
}

}
