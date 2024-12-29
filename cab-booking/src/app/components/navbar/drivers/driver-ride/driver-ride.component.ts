import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../services/auth-service/auth.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarService } from '../../../../services/car-service/car.service';
import { UserService } from '../../../../services/user-service/user.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { AdminService } from '../../../../services/admin-service/admin.service';



@Component({
  selector: 'app-driver-ride',
  standalone:true,
  imports: [CommonModule, RouterModule, GoogleMapsModule],
  templateUrl: './driver-ride.component.html',
  styleUrl: './driver-ride.component.css'
})
export class DriverRideComponent implements OnInit {
  
  showCarDetails: boolean = false;
  bookingDetails:any
  carDetails:any
  sourceUrl:any;
  destinationUrl:any;
  selectedUser:any;
  primaryCar:any
  primaryCarAvailability:any
  showBookingDetails: boolean = false;
  acceptText:any
  constructor(private auth: AuthService, private car: CarService, private user: UserService, private admin: AdminService){
    // this.bookingDetails = this.auth.mockBookingData.value[0]
    // this.sourceUrl = "https://www.google.com/maps?q="+this.bookingDetails.sourceCoord
    // this.destinationUrl = "https://www.google.com/maps?q="+this.bookingDetails.destinationCoord
  }
  ngOnInit(): void {
    this.getCarDetails()
  }
  
  getCarDetails() {
    let id = localStorage.getItem('id')
    // let id = 6 //change later
    this.admin.getCarDetailsById(id).subscribe({
      next: (data:any)=>{
        console.log(data);
        this.carDetails = data
        this.showCarDetails = true
      },
      error: (error:any)=>{
        console.log(error);
      }
    })
  }

  getBookingDetails(carid:any, availability:any){
    this.car.getBookingDetails(carid).subscribe({
      next: (data:any)=>{
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

  findAddress(location:any){
    const [lat, lng] = location.split(",").map((coord:any) => parseFloat(coord.trim()));
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

  findLocationUrl(location:any){    
    return 'https://google.com/maps?q='+location
  }


  viewDetails(id:any){
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
  
  

