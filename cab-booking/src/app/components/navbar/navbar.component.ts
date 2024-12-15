import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { PersonalDetailsModalComponent } from './personal-details-modal/personal-details-modal.component';
import { AuthService } from '../../services/auth-service/auth.service';
import { UserService } from '../../services/user-service/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, RouterModule, PersonalDetailsModalComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  
  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService, private user : UserService){}

  ngOnInit(): void {
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
    return this.user.getUserDetails()
  }


}
