import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),
    role: new FormControl(''),

  });
  constructor(private router:Router, private activatedRoute: ActivatedRoute){
    let x = this.activatedRoute.snapshot.paramMap.get('role')
    this.form.controls.role.setValue(x);
  }
  

  onsubmit(){
    if(this.form.valid){
    localStorage.setItem("username", this.form.get('username')?. value as string)
    console.log(this.form.value)
    // this.router.navigate(['navbar'])
    }
    else{
      alert("login with Valid details")
    }
  }


}
