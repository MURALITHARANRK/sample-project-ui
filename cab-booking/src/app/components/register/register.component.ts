import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  userService: any;

  constructor(private fb: FormBuilder,private router:Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator.bind(this)]]
    });
  }
  ngOnInit(): void {
    
    this.userService.getMockData().subscribe(
      (data: { [key: string]: any; }) => {
       
        this.registerForm.patchValue(data);
      },
      (error: any) => {
        console.error('Error fetching mock data', error);
      }
    );
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value; 
      console.log('User submitted:', user);
      this.router.navigate(['/login']); 
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
