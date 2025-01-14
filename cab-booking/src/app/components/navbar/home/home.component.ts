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
  userCount:number = 0
  driverCount:number = 0
  userDetailsPresent:boolean = true
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
            this.bookingCount = 0
          }
        })
      }      
    }, 1000);

  }
  ngOnInit(): void {
    this.checkUserDetailsPresent()
    this.userType = this.auth.getUserType()
    this.admin.getAllUsers().subscribe({
      next: (data:any)=>{
        this.userCount = data.length
      },
      error: (error)=>{
        this.userCount = 0
      }
    })
    this.admin.getDriverDetails().subscribe({
      next: (data:any)=>{
        this.driverCount = data.length
      },
      error: (error)=>{
        this.driverCount = 0
      }
    })
  }

  checkUserDetailsPresent(){
    this.user.getUserDetails(localStorage.getItem('username') as string).subscribe({
      next: (data)=>{
        if(data)
          this.userDetailsPresent = true
        console.log(data);
        
      },
      error: (error)=>{
        if(error.status==409)
          this.userDetailsPresent = false
      }
    })
  }

  
  


}
