import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { PersonalDetailsModalComponent } from './personal-details-modal/personal-details-modal.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';
import { CarDetailsModelComponent } from './car-details-model/car-details-model.component';
import { CarService } from '../../services/car-service/car.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, PersonalDetailsModalComponent, CarDetailsModelComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  modalName:any = ''
  childData:any = {}
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private user : UserService, private car: CarService){}

  ngOnInit(): void {
    if(localStorage.getItem('usertype')=='user'){
      this.getUserDetails()
      this.modalName = "#pdModal"
    }

    else{
      this.getCarDetails()
      this.modalName = "#cdModal"
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
    // let id = localStorage.getItem("id")
    let id = 1
    this.user.getUserDetails(id).subscribe(
      (data:any)=>{
        this.childData = data        
      }
    )
  }

  getCarDetails(){
    this.car.getcardetails().subscribe(
      (data:any)=>{
        let id = localStorage.getItem('id')
        let carData = data.find((u:any)=>u.id == id)
        this.childData = carData
      }
    )
  }


}
