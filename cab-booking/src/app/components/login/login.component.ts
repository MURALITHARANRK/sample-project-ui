import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import{FormControl,FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm=new FormGroup({
    username:new FormControl('', Validators.required),
    password:new FormControl('',[Validators.required, Validators.minLength(8)]),

  });
  constructor(private http: HttpClient, private router:Router, private activatedRoute: ActivatedRoute, private auth: AuthService){
  }

  ngOnInit(): void {
    localStorage.clear()
  }
  

  onsubmit(){

    this.auth.login()
    .subscribe(
      (data:any)=>{
        console.log(data);
        
        let user = data.find((u:any)=>u.username === this.loginForm.value.username && u.password === this.loginForm.value.password)
        console.log(user);
        
        if(user){
          localStorage.setItem('usertype', user.usertype)
          if(user.usertype == 'user')
            localStorage.setItem('customerid', user.customerid)
          else
            localStorage.setItem('id', user.id)

          this.auth.setLocalStorage('ldfh803457c94594ounsgtrytcj3vio58y45')
          this.router.navigate(['/navbar/home'])
        }
        else{
          alert("Wrong username or password")
        }
      }
    )    
    }
}
