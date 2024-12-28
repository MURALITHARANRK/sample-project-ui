import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AuthService } from '../../../../services/auth-service/auth.service';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarService } from '../../../../services/car-service/car.service';
import { UserService } from '../../../../services/user-service/user.service';
import { GoogleMapsModule } from '@angular/google-maps';



@Component({
  selector: 'app-driver-ride',
  standalone:true,
  imports: [CommonModule, RouterModule, GoogleMapsModule],
  templateUrl: './driver-ride.component.html',
  styleUrl: './driver-ride.component.css'
})
export class DriverRideComponent implements OnInit {
  
  showDetails: boolean = false;
  bookingDetails:any
  sourceUrl:any;
  destinationUrl:any;
  selectedUser:any;
index: any;
  constructor(private auth: AuthService, private car: CarService, private user: UserService){
    // this.bookingDetails = this.auth.mockBookingData.value[0]
    // this.sourceUrl = "https://www.google.com/maps?q="+this.bookingDetails.sourceCoord
    // this.destinationUrl = "https://www.google.com/maps?q="+this.bookingDetails.destinationCoord
  }
  ngOnInit(): void {
    this.getDetails()
  }
  
  getDetails() {
    let id = localStorage.getItem('id')
    // let id = 6 //change later
    this.car.getBookingDetails(id).subscribe({
      next: (data:any)=>{
        console.log(data);
        this.bookingDetails = data
        this.showDetails = true
      },
      error: (error:any)=>{
        console.log(error);
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
    console.log("working");
    
    return 'https://google.com/maps?q='+location
  }

  viewDetails(id:any){
    // this.auth.mockData$.subscribe(
    //   (data)=>{
    //     let user = data.find((u:any)=>u.customerid==id)
    //     this.selectedUser = user
    //   }
    // )
    let idd = 1
    this.user.getUserDetails(idd).subscribe({
      next: (data:any)=>{
        console.log(data);
        this.selectedUser = data
      },
      error: (error:any)=>{
        console.log(error);
      }
    })

  }
}
  
  

