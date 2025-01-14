import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../../services/user-service/user.service';
import { AdminService } from '../../../services/admin-service/admin.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  bookingCount:any;
  ridingStatus="Not in a ride";
  userType:string=''
  constructor(private http: HttpClient, private auth: AuthService, private user: UserService, private admin: AdminService){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if(this.userType == 'user'){
        let userid = localStorage.getItem('id')
        this.user.getBookingDetails(userid).subscribe({
          next: (data:any)=>{
            console.log(data);
            this.bookingCount = data.length
            let flag = data.findIndex((item:any) => item.endtime == null);
            if(flag!=-1){
              this.ridingStatus = "In a Ride"
            }
          },
          error: (error)=>{
  
          }
        })
      }      
    }, 1000);

  }
  ngOnInit(): void {
    this.userType = this.auth.getUserType()
  }

  
  


}
