import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import{FormBuilder, FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../../models/loginResponseModel';
import { Login } from '../../models/loginModel';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private fb: FormBuilder,private http: HttpClient, private router:Router, private auth: AuthService){
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['',[Validators.required, Validators.minLength(8)]],
  
    });
  }

  ngOnInit(): void {
    localStorage.clear()
  }
  
  onsubmit(){
    this.auth.login(this.loginForm.value)
    .subscribe({
      next: (data:LoginResponse)=>{                  
            if(data.message == "Login successful"){
              localStorage.setItem('usertype', data.userType)
              if(data.userType=='driver'){
                localStorage.setItem("id",data.id)
              }
              this.auth.setLocalStorage(data.token)
              localStorage.setItem('username', data.username)
              this.router.navigate(['/navbar/home'])
            }
      },
     error: (error:any)=>{
        console.log(error);
        if(error.status==401)
          alert("wrong username or password")
      }  
  })  
    }
}
