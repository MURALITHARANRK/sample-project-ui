import { Component } from '@angular/core';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [MapsComponent],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.css'
})
export class UserBookingComponent {

}
