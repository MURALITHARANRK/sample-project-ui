import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserDetails(){
    return {username: 'test1', email: 'test123@gmail.com', name: 'testcase'}
  }

  setUserDetails(userData: {name:string, username: string, email: string}){
    //api call
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

  setLocationDetails(locationCoords:any){
    //api call
  }
  


}
