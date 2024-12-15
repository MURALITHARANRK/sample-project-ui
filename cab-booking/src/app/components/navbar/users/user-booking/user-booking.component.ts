import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user-service/user.service';

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
    distance:any = 0
  
    constructor(private fb: FormBuilder, private user: UserService) {
      this.locationForm = this.fb.group({
        currentLocation: [''],
        destination: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.getUserLocation();
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
      this.submitted = true;
      this.distance = this.user.getLocationBetweenTwoPoints(this.locationCoords) as number
      this.distance = Math.round(this.distance)
      this.user.setLocationDetails(this.locationCoords)
    }  
}
