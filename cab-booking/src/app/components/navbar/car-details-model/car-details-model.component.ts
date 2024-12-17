import { Component,Input,OnChanges,OnInit, SimpleChanges } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,FormBuilder} from '@angular/forms';
import { CarService } from '../../../services/car-service/car.service';

@Component({
  selector: 'app-car-details-modal',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './car-details-model.component.html',
  styleUrl: './car-details-model.component.css'
})
export class CarDetailsModelComponent implements OnInit, OnChanges{
   @Input() carDetails: any
    carForm:FormGroup

    constructor(private fb: FormBuilder, private car: CarService){
      this.carForm = this.fb.group({
        registrationnumber: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl('')
      })
    }
  
    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes['carDetails']){
      this.carForm.get('registrationnumber')?.setValue(this.carDetails.registrationnumber)
      this.carForm.get('brand')?.setValue(this.carDetails.brand)
      this.carForm.get('model')?.setValue(this.carDetails.model)
      
      }
    }
  
    submit(){
      this.car.setCarDetails(this.carForm.value)
    }
  
  }
  

