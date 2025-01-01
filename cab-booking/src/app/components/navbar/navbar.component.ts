import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { PersonalDetailsModalComponent } from './personal-details-modal/personal-details-modal.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';
import { CarDetailsModelComponent } from './car-details-model/car-details-model.component';
import { CarService } from '../../services/car-service/car.service';
import { User } from '../../models/userDataModel';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, PersonalDetailsModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  modalName:string = ''
  childData!:User
  userType:string

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private user : UserService, private car: CarService){
    this.userType = this.auth.getUserType()
  }

  ngOnInit(): void {
    if(localStorage.getItem('usertype')=='user'){
      this.getUserDetails()
      this.modalName = "#pdModal"
    }
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  
  routeToBooking(){
    let usertype = this.auth.getUserType()
    if(usertype == 'user'){
      this.router.navigate(['user-booking'], {relativeTo: this.route})
    }
    else{
      this.router.navigate(['driver-ride'], {relativeTo: this.route})
    }
  }

  getUserDetails(){
    let username = localStorage.getItem("username") as string

    this.user.getUserDetails(username).subscribe(
      {
        next: (data:User)=>{
        console.log(data);
        
        localStorage.setItem("id",data.customerid)
        this.childData = data       

      }, 
      error: (error:any)=>{
        if(error.status == 409){
          console.log(error);
          this.childData = {name: localStorage.getItem('username') as string, contactnumber: '', emailaddress: '', customerid:''}
          console.log(this.childData)
        }
      }
    }
    )
  }

}
