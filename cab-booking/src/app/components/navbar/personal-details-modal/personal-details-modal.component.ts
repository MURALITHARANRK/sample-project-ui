import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service/auth.service';
import { UserService } from '../../../services/user-service/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/userDataModel';

@Component({
  selector: 'app-personal-details-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details-modal.component.html',
  styleUrl: './personal-details-modal.component.css'
})
export class PersonalDetailsModalComponent implements OnInit, OnChanges {
  @Input() userDetails!: User
  @ViewChild('modalClose') modalClose!: ElementRef
  userForm:FormGroup
  userDetailsNotAvailable:boolean = true
  constructor(private fb: FormBuilder, private user: UserService){
    this.userForm = this.fb.group({
      name: new FormControl(''),
      emailaddress: new FormControl(''),
      contactnumber: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['userDetails']){
        if(this.userDetails.contactnumber != '' && this.userDetails.contactnumber != undefined){
          this.userDetailsNotAvailable = false
        }

        this.userForm.get('contactnumber')?.setValue(this.userDetails.contactnumber)
        this.userForm.get('emailaddress')?.setValue(this.userDetails.emailaddress)
        this.userForm.get('name')?.setValue(this.userDetails.name)
      }
  }

  // formReset(){
  //   this.userForm.reset()
  //   this.userForm.get('name')?.setValue(this.userDetails.name)
  //   this.userForm.get('contactnumber')?.setValue(this.userDetails.contactnumber)
  //   this.userForm.get('emailaddress')?.setValue(this.userDetails.emailaddress)
  // }

  submit(){
    this.user.setUserDetails(this.userForm.value).subscribe(
      {
        next: (data)=>{
          console.log(data);
          alert("Please Login Again to Start Booking")
          this.modalClose.nativeElement.click()
          this.userDetailsNotAvailable = false
        },
        error: (error)=>{
          console.log(error);
        }
      }
    )   
  }

  

}
