import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../services/auth-service/auth.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarService } from '../../../../services/car-service/car.service';
import { UserService } from '../../../../services/user-service/user.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdminService } from '../../../../services/admin-service/admin.service';
import { Car } from '../../../../models/carModel';
import { Booking } from '../../../../models/bookingModel';



@Component({
  selector: 'app-driver-ride',
  standalone:true,
  imports: [CommonModule, RouterModule, GoogleMapsModule],
  templateUrl: './driver-ride.component.html',
  styleUrl: './driver-ride.component.css'
})
export class DriverRideComponent implements OnInit {
  
  showCarDetails: boolean = false;
  bookingDetails!:Booking[]
  carDetails!:Car[]
  selectedUser:any; //multiple uses
  primaryCar!:number
  primaryCarAvailability!:boolean
  showBookingDetails: boolean = false;
  acceptText:string=''
  constructor(private auth: AuthService, private car: CarService, private user: UserService, private admin: AdminService){

  }
  ngOnInit(): void {
    this.getCarDetails()
  }
  
  getCarDetails() {
    let id = localStorage.getItem('id') as string
    this.admin.getCarDetailsById(id).subscribe({
      next: (data:Car[])=>{
        console.log(data);
        this.carDetails = data
        this.showCarDetails = true
      },
      error: (error:any)=>{
        console.log(error);
      }
    })
  }

  getBookingDetails(carid:number, availability:boolean){
    this.selectedUser = ''
    this.car.getBookingDetails(carid).subscribe({
      next: (data:Booking[])=>{
        console.log(data);
        this.bookingDetails = data
        this.primaryCar = carid
        this.primaryCarAvailability = availability
        this.showBookingDetails = true
      },
      error: (error:any)=>{

        console.log(error);
        this.showBookingDetails = false
      }
    })
  }

  findAddress(location:string){
    const [lat, lng] = location.split(",").map((coord:string) => parseFloat(coord.trim()));
    console.log(lat, lng);
    
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      { location: { lat: lat as number, lng: lng as number } },
      (results:any, status:any) => {
        if (status === 'OK' && results.length > 0) {
          console.log(results[0].formatted_address);
          return results[0].formatted_address
        } 
        else {
          return "click here for location"
        }
      }
    );
  }

  findLocationUrl(location:string){    
    return 'https://google.com/maps?q='+location
  }


  viewDetails(id:number){
    this.user.getUserDetailsById(id).subscribe({
      next: (data:any)=>{
        console.log(data);
        this.selectedUser = data
        if(this.primaryCarAvailability == true){
          this.acceptText = "Accept Ride"
        }
        else{
          this.acceptText = "Ride Accepted"
        }
      },
      error: (error:any)=>{
        console.log(error);
      }
    })
  }

  acceptRide(){
    this.car.acceptRide(this.primaryCar).subscribe({
      next: (data:any)=>{
        console.log(data);
        this.acceptText = "Ride Accepted"
        alert(data)
      },
      error: (error:any)=>{
        console.log(error);
      }
    })
  }
}
  
  

