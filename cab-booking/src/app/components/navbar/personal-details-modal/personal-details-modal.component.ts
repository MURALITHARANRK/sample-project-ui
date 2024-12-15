import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personal-details-modal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './personal-details-modal.component.html',
  styleUrl: './personal-details-modal.component.css'
})
export class PersonalDetailsModalComponent implements OnInit {
  @Input() userDetails: any
  userForm:FormGroup
  constructor(private fb: FormBuilder, private auth: AuthService){
    this.userForm = this.fb.group({
      name: new FormControl(''),
      email: new FormControl(''),
      username: new FormControl('')
    })
  }

  ngOnInit(): void {
    console.log(this.userDetails);

      this.userForm.get('username')?.setValue(this.userDetails.username)
      this.userForm.get('email')?.setValue(this.userDetails.email)
      this.userForm.get('name')?.setValue(this.userDetails.name)
  }

  submit(){
    this.auth.setUserDetails(this.userForm.value)
  }

}
