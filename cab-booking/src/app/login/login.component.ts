import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import{FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form=new FormGroup({
    username:new FormControl('', Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(8)])

  });
  constructor(private router:Router){}
  

  onsubmit(){
    if(this.form.valid){
    localStorage.setItem("username", this.form.get('username')?. value as string)
    this.router.navigate(['register'])
    }
    else{
      alert("login with Valid details")
    }
  }


}
