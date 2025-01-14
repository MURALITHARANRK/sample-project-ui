import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AuthService } from '../auth-service/auth.service';
import { User } from '../../models/userDataModel';
import { BookingDetails } from '../../models/bookingDetailsModel';
import { Booking } from '../../models/bookingModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL
  constructor(private http:HttpClient, private auth:AuthService) { }

  mockBookingData:BehaviorSubject<any> = new BehaviorSubject({
    bookingid: 1,
    carid:'2',
    destination:	'20.8972092,105.5738179',
    endtime: '4:38:37 PM',
    source:	'12.9040384,80.0882688',
    starttime: '3:53:48 PM'	,
    userid: '1'
  })

  mockBookingData$:Observable<any> = this.mockBookingData.asObservable()

  getUserDetails(username:string){
    // return this.auth.mockData$
    // return this.http.get(this.API_URL+'user/'+id as string)
    
    // let username = localStorage.getItem('username')
    return this.http.get<User>(this.API_URL+'user/name/'+username)
  }

  getUserDetailsById(id:number){
    return this.http.get(this.API_URL+'car?id='+id)
  }

  setUserDetails(userData: {name:string, emailaddress: string, contactnumber: string}){
    // let customerid = localStorage.getItem('customerid');
    // let currentArray = this.auth.mockData.value;
    // let updatedArray = currentArray.map((obj:any)=>{
    //   return obj.customerid == customerid ? {...obj, ...userData} : obj
    // })
    // this.auth.mockData.next(updatedArray)
    return this.http.post(this.API_URL+'user/create',userData)
  }

  getLocationBetweenTwoPoints(locationCoords: any){

    let lat1 = locationCoords.currentLat
    let lat2 = locationCoords.destinationLat

    let lon1 = locationCoords.currentLng
    let lon2 = locationCoords.destinationLng

    let dLat = (lat2 - lat1) * Math.PI / 180.0;
    let dLon = (lon2 - lon1) * Math.PI / 180.0;
       
    lat1 = (lat1) * Math.PI / 180.0;
    lat2 = (lat2) * Math.PI / 180.0;
     
    let a = Math.pow(Math.sin(dLat / 2), 2) + 
               Math.pow(Math.sin(dLon / 2), 2) * 
               Math.cos(lat1) * 
               Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    return rad * c;
  }

  setBookingDetails(bookingDetails:BookingDetails){
    console.log(bookingDetails, "final")
    return this.http.post<Booking>(this.API_URL+'user/booking',bookingDetails)
  }

  getBookingDetails(userid:any){
    return this.http.get(this.API_URL+'admin/user/'+userid)
  }

  endRide(carid:any, endtime:any){
    return this.http.put(this.API_URL+'user/'+carid+'/endTrip?endTime='+endtime,'',{responseType:'text'})
  }
  
}
