import { Component, NgModule } from '@angular/core';
import { OnInit } from '@angular/core';
import { DriverDetailsService } from '../../../../services/driver-details-service/driver-details.service';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-driver-details',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.css'
})
export class DriverDetailsComponent implements OnInit {
  
  a:any
  constructor(private service:DriverDetailsService){}
  ngOnInit(): void {
    this.a=this.service.getdriverDetails();
  }
}
