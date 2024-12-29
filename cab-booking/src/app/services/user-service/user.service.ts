import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL
  constructor(private http:HttpClient, private auth:AuthService) { }

  getUserDetails(username:any){
    // return this.auth.mockData$
    // return this.http.get(this.API_URL+'user/'+id as string)
    
    // let username = localStorage.getItem('username')
    return this.http.get(this.API_URL+'user/name/'+username)
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

  setBookingDetails(bookingDetails:any){
    console.log(bookingDetails, "final")
    return this.http.post(this.API_URL+'user/booking',bookingDetails)
  }
  
}
