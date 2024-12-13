import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';



@Component({
  selector: 'app-driver-ride',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './driver-ride.component.html',
  styleUrl: './driver-ride.component.css'
})
export class DriverRideComponent {
  
  showDetails: boolean = false;

  userDetails = {
    name: 'Siva',
    source: 'Coimbatore',
    destination: 'Chicago',
  };

  getDetails() {
    this.showDetails = true;
  }
}
  
  

