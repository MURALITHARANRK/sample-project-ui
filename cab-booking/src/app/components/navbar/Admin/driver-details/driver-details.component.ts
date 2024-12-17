import { Component, NgModule } from '@angular/core';
import { OnInit } from '@angular/core';
import { DriverDetailsService } from '../../../../services/driver-details-service/driver-details.service';
import { CommonModule} from '@angular/common';
import { AdminService } from '../../../../services/admin-service/admin.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-driver-details',
  imports: [CommonModule, RouterModule],
  standalone:true,
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent implements OnInit {
  
  driverDetails:any
  constructor(private admin:AdminService){}
  ngOnInit(): void {
    this.driverDetails=this.admin.getDriverDetails();
  }
}
