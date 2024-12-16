import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
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
      this.auth.addData(user).subscribe(
        (data:any)=>{
          if(data.status == 409){
            alert("user already exists")
          }
          else{
            alert("Registration Sucessful")
            this.router.navigate(['/login'])
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
