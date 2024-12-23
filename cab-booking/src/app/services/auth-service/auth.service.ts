import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
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
      "userType": "user"
    },
    {
      "customerid": 1002,
      "name": "Jane",
      "username": "jane",
      "emailaddress": "janesmith@gmail.com",
      "contactnumber": "8765432109",
      "password": "admin@1234",
      "userType": "user"
    },
    {
      "customerid": 1003,
      "name": "Mark",
      "username": "mark_johnson",
      "emailaddress": "markjohnson@gmail.com",
      "contactnumber": "7654321098",
      "password": "securepass1",
      "userType": "user"
    },
    {
      "customerid": 1004,
      "name": "Emily",
      "username": "emily_brown",
      "emailaddress": "emilybrown@gmail.com",
      "contactnumber": "6543210987",
      "password": "passcode987",
      "userType": "user"
    },
    {
      "customerid": 1005,
      "name": "Chris",
      "username": "chris_davis",
      "emailaddress": "chrisdavis@gmail.com",
      "contactnumber": "5432109876",
      "password": "mysecurepwd",
      "userType": "admin"
    },
    {
      "customerid": 1006,
      "name": "Sophia",
      "username": "sophia_wilson",
      "emailaddress": "sophiawilson@gmail.com",
      "contactnumber": "4321098765",
      "password": "user12345",
      "userType": "user"
    },
    {
      "customerid": 1007,
      "name": "James",
      "username": "james_anderson",
      "emailaddress": "jamesanderson@gmail.com",
      "contactnumber": "3210987654",
      "password": "strongpass8",
      "userType": "admin"
    },
    {
      "customerid": 1008,
      "name": "Olivia",
      "username": "olivia_thomas",
      "emailaddress": "oliviathomas@gmail.com",
      "contactnumber": "2109876543",
      "password": "user!pass",
      "userType": "user"
    },
    {
      "customerid": 1009,
      "name": "Liam",
      "username": "liam_martinez",
      "emailaddress": "liammartinez@gmail.com",
      "contactnumber": "1098765432",
      "password": "userPwd99",
      "userType": "user"
    },
    {
      "customerid": 1010,
      "name": "Ava",
      "username": "ava_moore",
      "emailaddress": "avamoore@gmail.com",
      "contactnumber": "9876543211",
      "password": "admin_9876",
      "userType": "user"
    },
    {
      "id": 1011,
      "username": "driver1",
      "userType": "driver",
      "password": "password123",
      "registrationnumber": "AB123456",
      "brand": "Toyota",
      "model": "Corolla"
    },
    {
      "id": 1012,
      "username": "driver2",
      "userType": "driver",
      "password": "driverPass1",
      "registrationnumber": "BC234567",
      "brand": "Honda",
      "model": "Civic"
    },
    {
      "id": 1013,
      "username": "driver3",
      "userType": "driver",
      "password": "secureDriver2",
      "registrationnumber": "CD345678",
      "brand": "Ford",
      "model": "Focus"
    },
    {
      "id": 1014,
      "username": "driver4",
      "userType": "driver",
      "password": "drive1234",
      "registrationnumber": "DE456789",
      "brand": "Chevrolet",
      "model": "Malibu"
    },
    {
      "id": 1015,
      "username": "driver5",
      "userType": "driver",
      "password": "driver2023",
      "registrationnumber": "EF567890",
      "brand": "Hyundai",
      "model": "Elantra"
    },
    {
      "id": 1016,
      "username": "driver6",
      "userType": "driver",
      "password": "mypassword",
      "registrationnumber": "FG678901",
      "brand": "Nissan",
      "model": "Altima"
    },
    {
      "id": 1017,
      "username": "driver7",
      "userType": "driver",
      "password": "drivepass99",
      "registrationnumber": "GH789012",
      "brand": "Kia",
      "model": "Optima"
    },
    {
      "id": 1018,
      "username": "driver8",
      "userType": "driver",
      "password": "carDriver88",
      "registrationnumber": "HI890123",
      "brand": "Mazda",
      "model": "Mazda3"
    },
    {
      "id": 1019,
      "username": "driver9",
      "userType": "driver",
      "password": "secure12345",
      "registrationnumber": "IJ901234",
      "brand": "Subaru",
      "model": "Impreza"
    },
    {
      "id": 1020,
      "username": "driver10",
      "userType": "driver",
      "password": "driverSecure!",
      "registrationnumber": "JK012345",
      "brand": "Volkswagen",
      "model": "Jetta"
    },
    {
      "customerid": 1111,
      "name": "",
      "username": "qqqq",
      "emailaddress": "",
      "contactnumber": "",
      "password": "00000000",
      "userType": "user"
    },
    {
      "id": 1222,
      "username": "driver2",
      "userType": "driver",
      "password": "00000000",
      "registrationnumber": "",
      "brand": "",
      "model": ""
    }
  ]
  )

  mockBookingData: BehaviorSubject<any> = new BehaviorSubject([
    {
      bookingid: 1,
      userid: 1001,
      carid: 1021,
      starttime: '',
      endtime: '',
      source: '357Q+PRP, Valliammai Nagar, Koyambedu, Chennai, Tamil Nadu 600092, India',
      sourceCoord: '13.0700829,80.1844677',
      destinationCoord: '12.9967724,80.2437957',
      destination: 'Ramanujan IT City, SH 49A, OMR, Tharamani, Chennai, Tamil Nadu 600113, India'
    }
  ])

  mockData$ :Observable<any> = this.mockData.asObservable() 

  mockBookingData$: Observable<any> = this.mockBookingData.asObservable()

  API_URL = environment.API_URL
  static addData: any;

  constructor(private http: HttpClient) {}

  setLocalStorage(token:any){
    localStorage.setItem('token', token)
  }

  isLoggedIn(){
    let authToken = localStorage.getItem('token')
    return true? authToken!='' && authToken!=undefined : false
  }

  login(userData:any){  
    // return this.mockData$  
    return this.http.post(this.API_URL+'register/login', userData)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUserType(){
    return localStorage.getItem('usertype')
  }
  
  addData(newData:any) {
    // let newObject = {...newData, customerid: Math.floor(1000 + Math.random() * 9000), name: '', emailaddress: '', contactnumber: ''}
    // let newArray = [...this.mockData.value, newObject]
    // this.mockData.next(newArray)

    return this.http.post(this.API_URL+'register/create', newData)
  }
}


