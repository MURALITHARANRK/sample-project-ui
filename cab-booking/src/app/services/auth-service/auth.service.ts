import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mockData:BehaviorSubject<any> = new BehaviorSubject<any>([
    {
      "customerid": 1001,
      "name": "John",
      "username": "john",
      "emailaddress": "johndoe@gmail.com",
      "contactnumber": "9876543210",
      "password": "password123",
      "usertype": "user"
    },
    {
      "customerid": 1002,
      "name": "Jane",
      "username": "jane",
      "emailaddress": "janesmith@gmail.com",
      "contactnumber": "8765432109",
      "password": "admin@1234",
      "usertype": "user"
    },
    {
      "customerid": 1003,
      "name": "Mark",
      "username": "mark_johnson",
      "emailaddress": "markjohnson@gmail.com",
      "contactnumber": "7654321098",
      "password": "securepass1",
      "usertype": "user"
    },
    {
      "customerid": 1004,
      "name": "Emily",
      "username": "emily_brown",
      "emailaddress": "emilybrown@gmail.com",
      "contactnumber": "6543210987",
      "password": "passcode987",
      "usertype": "user"
    },
    {
      "customerid": 1005,
      "name": "Chris",
      "username": "chris_davis",
      "emailaddress": "chrisdavis@gmail.com",
      "contactnumber": "5432109876",
      "password": "mysecurepwd",
      "usertype": "admin"
    },
    {
      "customerid": 1006,
      "name": "Sophia",
      "username": "sophia_wilson",
      "emailaddress": "sophiawilson@gmail.com",
      "contactnumber": "4321098765",
      "password": "user12345",
      "usertype": "user"
    },
    {
      "customerid": 1007,
      "name": "James",
      "username": "james_anderson",
      "emailaddress": "jamesanderson@gmail.com",
      "contactnumber": "3210987654",
      "password": "strongpass8",
      "usertype": "admin"
    },
    {
      "customerid": 1008,
      "name": "Olivia",
      "username": "olivia_thomas",
      "emailaddress": "oliviathomas@gmail.com",
      "contactnumber": "2109876543",
      "password": "user!pass",
      "usertype": "user"
    },
    {
      "customerid": 1009,
      "name": "Liam",
      "username": "liam_martinez",
      "emailaddress": "liammartinez@gmail.com",
      "contactnumber": "1098765432",
      "password": "userPwd99",
      "usertype": "user"
    },
    {
      "customerid": 1010,
      "name": "Ava",
      "username": "ava_moore",
      "emailaddress": "avamoore@gmail.com",
      "contactnumber": "9876543211",
      "password": "admin_9876",
      "usertype": "user"
    },
    {
      "id": 1011,
      "username": "driver1",
      "usertype": "driver",
      "password": "password123",
      "registrationnumber": "AB123456",
      "brand": "Toyota",
      "model": "Corolla"
    },
    {
      "id": 1012,
      "username": "driver2",
      "usertype": "driver",
      "password": "driverPass1",
      "registrationnumber": "BC234567",
      "brand": "Honda",
      "model": "Civic"
    },
    {
      "id": 1013,
      "username": "driver3",
      "usertype": "driver",
      "password": "secureDriver2",
      "registrationnumber": "CD345678",
      "brand": "Ford",
      "model": "Focus"
    },
    {
      "id": 1014,
      "username": "driver4",
      "usertype": "driver",
      "password": "drive1234",
      "registrationnumber": "DE456789",
      "brand": "Chevrolet",
      "model": "Malibu"
    },
    {
      "id": 1015,
      "username": "driver5",
      "usertype": "driver",
      "password": "driver2023",
      "registrationnumber": "EF567890",
      "brand": "Hyundai",
      "model": "Elantra"
    },
    {
      "id": 1016,
      "username": "driver6",
      "usertype": "driver",
      "password": "mypassword",
      "registrationnumber": "FG678901",
      "brand": "Nissan",
      "model": "Altima"
    },
    {
      "id": 1017,
      "username": "driver7",
      "usertype": "driver",
      "password": "drivepass99",
      "registrationnumber": "GH789012",
      "brand": "Kia",
      "model": "Optima"
    },
    {
      "id": 1018,
      "username": "driver8",
      "usertype": "driver",
      "password": "carDriver88",
      "registrationnumber": "HI890123",
      "brand": "Mazda",
      "model": "Mazda3"
    },
    {
      "id": 1019,
      "username": "driver9",
      "usertype": "driver",
      "password": "secure12345",
      "registrationnumber": "IJ901234",
      "brand": "Subaru",
      "model": "Impreza"
    },
    {
      "id": 1020,
      "username": "driver10",
      "usertype": "driver",
      "password": "driverSecure!",
      "registrationnumber": "JK012345",
      "brand": "Volkswagen",
      "model": "Jetta"
    }
  ]
  )

  mockData$ :Observable<any> = this.mockData.asObservable() 

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
    return this.mockData$
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserType(){
    return localStorage.getItem('usertype')
  }

}
