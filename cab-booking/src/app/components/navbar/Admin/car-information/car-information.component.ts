import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../../services/admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { CarDetailsModelComponent } from '../../car-details-model/car-details-model.component';

@Component({
  selector: 'app-car-information',
  standalone:true,
  imports: [CommonModule, CarDetailsModelComponent],
  templateUrl: './car-information.component.html',
  styleUrl: './car-information.component.css'
})
export class CarInformationComponent {
  
  carDetails:any
  childData:any
  constructor(private admin:AdminService, private active:ActivatedRoute){}
  ngOnInit(): void {
    let driverid = this.active.snapshot.paramMap.get('id')
    this.admin.getCarDetailsById(driverid).subscribe({
      next: (cars) => {
        this.carDetails = cars; 
        console.log(cars);
      },
      error: (err) => console.error('Error:', err.error),
    });
  }
}
