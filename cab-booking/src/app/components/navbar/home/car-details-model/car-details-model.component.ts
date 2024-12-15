import { Component,Input,OnInit } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-car-details-model',
  imports: [ReactiveFormsModule],
  standalone:true,
  templateUrl: './car-details-model.component.html',
  styleUrl: './car-details-model.component.css'
})
export class CarDetailsModelComponent implements OnInit{
   @Input() cardetails: any
    carForm:FormGroup
  auth: any;
    constructor(private fb: FormBuilder){
      this.carForm = this.fb.group({
        reg_number: new FormControl(''),
        availability: new FormControl(''),
        brand: new FormControl(''),
        model: new FormControl('')
      })
    }
  
    ngOnInit(): void {
      console.log(this.cardetails);
  
        this.carForm.get('reg_number')?.setValue(this.cardetails.reg_number)
        this.carForm.get('availability')?.setValue(this.cardetails.availability)
        this.carForm.get('brand')?.setValue(this.cardetails.brand)
        this.carForm.get('model')?.setValue(this.cardetails.model)

    }
  
    submit(){
      this.auth.setcardetails(this.carForm.value)
    }
  
  }
  

