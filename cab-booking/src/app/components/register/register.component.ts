import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { Register } from '../../models/registerModel';
import { RegisterResponse } from '../../models/registerResponseModel';

@Component({
  selector: 'app-register',
  // standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,private router:Router, private auth: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      usertype: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.registerForm.valid) 
    {
      const user = this.registerForm.value; 
      this.auth.register(user).subscribe(
        {
          next: (data:RegisterResponse)=>{
            console.log(data)
            alert("Registration Sucessful")
            this.router.navigate(['/login'])
        }, 
        error: (error)=>{
          if(error.status == 409){
            alert("User Name already exists")
          }
        }
      }
      )
    }
  }

  passwordMatchValidator(control: FormControl): {[key:string]: boolean} | null{
    if(this.registerForm){
      let password = this.registerForm.get('password')?.value;
      if(password !== control.value){
          return {passwordMismatch: true}
      }
    }
      return null
  }
}
