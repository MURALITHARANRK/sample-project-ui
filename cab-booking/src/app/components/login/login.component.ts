import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import{FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    username:new FormControl('', Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),

  });
  constructor(private http: HttpClient, private router:Router, private auth: AuthService){
  }

  ngOnInit(): void {
    localStorage.clear()
  }
  
  onsubmit(){

    this.auth.login(this.loginForm.value)
    .subscribe({
      next: (data:any)=>{                  
            // let data = dat.find((u:any)=>u.username == this.loginForm.value.username && this.loginForm.value.password)
            localStorage.setItem('usertype', data.userType)
            this.auth.setLocalStorage(data.token)
            localStorage.setItem('username', data.username)
            this.router.navigate(['/navbar/home'])
      },
     error: (error:any)=>{
        console.log(error);
        if(error.status==401)
          alert("wrong username or password")
      }  
  })  
    }
}
