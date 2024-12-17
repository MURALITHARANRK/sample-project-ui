import { Component } from '@angular/core';
import { CarInformationService } from '../services/car-information-service/car-information.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-information',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './car-information.component.html',
  styleUrl: './car-information.component.css'
})
export class CarInformationComponent {
  
  a:any
  constructor(private service:CarInformationService){}
  ngOnInit(): void {
    this.a=this.service.getcarDetails();
  }
}
