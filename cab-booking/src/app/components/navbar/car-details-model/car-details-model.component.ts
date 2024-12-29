import { Component,ElementRef,Input,OnChanges,OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,FormBuilder} from '@angular/forms';
import { CarService } from '../../../services/car-service/car.service';
import { AdminService } from '../../../services/admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-car-details-modal',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './car-details-model.component.html',
  styleUrl: './car-details-model.component.css'
})
export class CarDetailsModelComponent implements OnInit, OnChanges{
   @Input() carDetails: any
   @ViewChild('closeButton') closeButton!: ElementRef
    carForm:FormGroup
    constructor(private fb: FormBuilder, private admin: AdminService, private active: ActivatedRoute){
      this.carForm = this.fb.group({
        driverid: [this.active.snapshot.paramMap.get('id')],
        registrationNumber: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl(''),
        availability: [true]
      })
    }
  
    ngOnInit(): void {
      console.log(this.carForm.value);
    }

    ngOnChanges(changes: SimpleChanges): void {
    }
  
    submit(){
      console.log(this.carForm.value);
      this.admin.setCarDetails(this.carForm.value).subscribe(
        {
          next: (data)=>{
            console.log(data);
            this.closeButton.nativeElement.click()
          },
          error: (error)=>{
            console.log(error);
          }
        }
      )
      this.carForm.reset()
      this.carForm.get('id')?.setValue(this.active.snapshot.paramMap.get('id'))
    }
  
  }
  

