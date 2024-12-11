import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import{FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form=new FormGroup({
    username:new FormControl('', Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
    role: new FormControl(''),

  });
  constructor(private router:Router, private activatedRoute: ActivatedRoute, private auth: AuthService){
    let x = this.activatedRoute.snapshot.paramMap.get('role')
    this.form.controls.role.setValue(x);
  }
  

  onsubmit(){

    let message = this.auth.login(this.form.value)
    
    if(message){
      this.router.navigate(['/navbar/home'])
    }
    else{
      alert("Wrong username or password")
    }
    console.log(this.form.value)
    }
}
