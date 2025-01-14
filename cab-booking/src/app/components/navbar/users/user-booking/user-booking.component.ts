import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user-service/user.service';
import { CarService } from '../../../../services/car-service/car.service';
import { LocationCoords } from '../../../../models/locationCoordsModel';
import { BookingDetails } from '../../../../models/bookingDetailsModel';
import { Car } from '../../../../models/carModel';
import { Booking } from '../../../../models/bookingModel';

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule, ReactiveFormsModule],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent {

    locationForm: FormGroup;
    currentLocation: string = '';
    endRideText = "Waiting for driver to accept ride"
    submitted = false;
    locationCoords:LocationCoords = {
      currentLat: 0, 
      currentLng: 0,
      destinationLat: 0, 
      destinationLng: 0
  }
    bookingDetails!:BookingDetails
    distance = 0
    showCarTypes!: boolean;
    carData!:Car[]
    userDetailsPresent:boolean = true
    constructor(private fb: FormBuilder, private user: UserService, private car: CarService) {
      this.locationForm = this.fb.group({
        currentLocation: [''],
        destination: ['', Validators.required],
        carid: [''],
      });
    }

    getCarData(){
      this.car.getCarData().subscribe(
        (data:Car[])=>{this.carData = data; console.log(data)}
      )
    }

    sample(){
      console.log(this.locationForm.value);
      
    }
  
    onFindDriver() {
      if (this.locationForm.valid) {
        this.getCarData()
        this.showCarTypes = true;
      }
    }

    onEndRide() {
      let id=this.locationForm.get('carid')?.value
      let endtime=new Date().toLocaleTimeString()
      this.user.endRide(id, endtime).subscribe({
        next:(data:string)=>{
          console.log(data);
          alert("Ride has been completed. You have reached your destination. ");
          this.locationForm.reset()
          this.getUserLocation();
          this.submitted = false
          this.showCarTypes = false
        },
        error:(err:any)=>{
          console.log('Error', err);
        }
      })
      
      

    }

    checkUserDetailsPresent(){
      this.user.getUserDetails(localStorage.getItem('username') as string).subscribe({
        next: (data)=>{
          if(data)
            this.userDetailsPresent = true
          console.log(data);
          
        },
        error: (error)=>{
          if(error.status==409)
            this.userDetailsPresent = false
        }
      })
    }
      
    ngOnInit(): void {
      this.checkUserDetailsPresent();
      this.getUserLocation();
      this.getCarData();
    }

    getBookingDetails(){
      let userid = localStorage.getItem('id')
      this.user.getBookingDetails(userid).subscribe({
        next: (bookingdata:any)=>{
          console.log(bookingdata)
          let flag = bookingdata.findIndex((item:any) => item.endtime == null);
          console.log(flag)
          if(flag == -1){
            
          }
          else{
            let data = bookingdata[flag]
            let address = this.findAddress(data.destination)
            console.log(address)
            this.showCarTypes = true
            this.locationForm.controls['carid'].setValue(data.carid)
            this.submitted = true
            let x = setInterval(()=>{
              this.car.getCarDetailsById(this.locationForm.get('carid')?.value).subscribe({
              next: (data:Car)=>{
                console.log(data)
                if(data.availability == false){
                  this.endRideText = "End Ride"
                  clearInterval(x)
                }
              },
              error: (error:any)=>{
                console.error(error)
              }
              })
            },3000)

          }
        },
        error: (error)=>{
          if(error.status==404){
            console.log("No booking data found")
          }
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
            this.locationForm.get('destination')?.setValue(results[0].formatted_address)
            return results[0].formatted_address
          } 
          else {
            return "No address found"
          }
        }
      );
    }
  
    ngAfterViewInit(): void {
      this.initializeAutocomplete();
      this.getBookingDetails();

    }
  
    getUserLocation(): void {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
              this.locationCoords.currentLat = latitude;
              this.locationCoords.currentLng = longitude;
              const geocoder = new google.maps.Geocoder();
              geocoder.geocode(
                { location: { lat: latitude, lng: longitude } },
                (results:any, status:any) => {
                  
                  if (status === 'OK' && results.length > 0) {
                    this.locationForm.get('currentLocation')?.setValue(results[0].formatted_address)
                  } else {
                    this.locationForm.get('currentLocation')?.setValue('UNABLE TO DETERMINE LOCATION')
  
                  }
                }
              );
            },
            (error) => {
              console.error('Error getting location:', error);
              this.locationForm.get('currentLocation')?.setValue('UNABLE TO ACCESS LOCATION')
  
            }
          );
        } else {
          this.locationForm.get('currentLocation')?.setValue('LOCATION NOT SUPPORTED')
        }
    }
  
    initializeAutocomplete(): void {
        const input = document.getElementById('destination') as HTMLInputElement;
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place && place.formatted_address) {
            
            this.locationForm.patchValue({ destination: place.formatted_address });
            this.locationCoords.destinationLat = place.geometry?.location?.lat() as number;
            this.locationCoords.destinationLng = place.geometry?.location?.lng() as number;
          }
        });
    }
  
    onSubmit(): void {
      
      this.distance = this.user.getLocationBetweenTwoPoints(this.locationCoords) as number
      this.distance = Math.round(this.distance)

      this.bookingDetails = {
        source: `${this.locationCoords.currentLat},${this.locationCoords.currentLng}`, //change later
        destination: `${this.locationCoords.destinationLat},${this.locationCoords.destinationLng}`, //change later
        carid: this.locationForm.get('carid')?.value,
        userid: localStorage.getItem('id') as string,
        starttime: new Date().toLocaleTimeString(),
    };

      this.user.setBookingDetails(this.bookingDetails).subscribe({
        next: (data:Booking)=>{
          console.log(data, "yes");
          this.submitted = true;
        },
        error: (error:any)=>{
          console.log(error);
        }
      })
      let x = setInterval(()=>{
        this.car.getCarDetailsById(this.bookingDetails.carid).subscribe({
        next: (data:Car)=>{
          console.log(data)
          if(data.availability == false){
            this.endRideText = "End Ride"
            clearInterval(x)
          }
        },
        error: (error:any)=>{
          console.error(error)
        }
        })
      },3000)
      console.log(this.bookingDetails);
      
      console.log(this.locationCoords);
      
      // this.user.setLocationDetails(this.locationCoords)
    }  
}
