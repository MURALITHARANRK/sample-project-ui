import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { AuthService } from '../../../../services/auth-service/auth.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-driver-ride',
  standalone:true,
  imports: [CommonModule, RouterModule],
  templateUrl: './driver-ride.component.html',
  styleUrl: './driver-ride.component.css'
})
export class DriverRideComponent {
  
  showDetails: boolean = false;
  userDetails:any
  sourceUrl:any;
  destinationUrl:any;
  selectedUser:any;
  constructor(private auth: AuthService){
    this.userDetails = this.auth.mockBookingData.value[0]
    this.sourceUrl = "https://www.google.com/maps?q="+this.userDetails.sourceCoord
    this.destinationUrl = "https://www.google.com/maps?q="+this.userDetails.destinationCoord
  }

  getDetails() {
    this.showDetails = true;
  }

  viewDetails(id:any){
    this.auth.mockData$.subscribe(
      (data)=>{
        let user = data.find((u:any)=>u.customerid==id)
        this.selectedUser = user
      }
    )
  }
}
  
  

