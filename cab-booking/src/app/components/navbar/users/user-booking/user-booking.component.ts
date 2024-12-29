import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user-service/user.service';
import { CarService } from '../../../../services/car-service/car.service';

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
    submitted = false;
    locationCoords: any = {currentLat: '', currentLng: '',destinationLat: '', destinationLng: ''}
    bookingDetails:any
    distance:any = 0
    showCarTypes: any;
    carData:any
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
        (data)=>{this.carData = data; console.log(data)}
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
      //api call
      let id=this.locationForm.get('carid')?.value
      let endtime=new Date().toLocaleTimeString()
      this.user.endRide(id, endtime).subscribe({
        next:(data:any)=>{
          console.log(data);
          alert(data);
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
      this.user.getUserDetails(localStorage.getItem('username')).subscribe({
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
  
    ngAfterViewInit(): void {
      this.initializeAutocomplete();
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
            this.locationCoords.destinationLat = place.geometry?.location?.lat();
            this.locationCoords.destinationLng = place.geometry?.location?.lng();
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
        userid: localStorage.getItem('id'),
        starttime: new Date().toLocaleTimeString(),
    };

      this.user.setBookingDetails(this.bookingDetails).subscribe({
        next: (data:any)=>{
          console.log(data, "yes");
          this.submitted = true;
        },
        error: (error:any)=>{
          console.log(error);
        }
      })
      console.log(this.bookingDetails);
      
      console.log(this.locationCoords);
      
      // this.user.setLocationDetails(this.locationCoords)
    }  
}
