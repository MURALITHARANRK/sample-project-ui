import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';
import { UserService } from '../../../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-details-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details-modal.component.html',
  styleUrl: './personal-details-modal.component.css'
})
export class PersonalDetailsModalComponent implements OnInit, OnChanges {
  @Input() userDetails: any
  @ViewChild('modalClose') modalClose!: ElementRef
  userForm:FormGroup
  constructor(private fb: FormBuilder, private user: UserService){
    this.userForm = this.fb.group({
      // customerid: [1], //change later
      name: new FormControl(''),
      emailaddress: new FormControl(''),
      contactnumber: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['userDetails']){
        this.userForm.get('contactnumber')?.setValue(this.userDetails.contactnumber)
        this.userForm.get('emailaddress')?.setValue(this.userDetails.emailaddress)
        this.userForm.get('name')?.setValue(this.userDetails.name)
      }
  }

  formReset(){
    this.userForm.reset()
    this.userForm.get('name')?.setValue(this.userDetails.name)
  }

  submit(){
    this.user.setUserDetails(this.userForm.value).subscribe(
      {
        next: (data)=>{
          console.log(data);
          this.modalClose.nativeElement.click()
          
        },
        error: (error)=>{
          console.log(error);
        }
      }
    )   
  }

  

}
