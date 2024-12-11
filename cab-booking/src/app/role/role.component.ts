import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-role',
  imports: [RouterModule],
  standalone:true,
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

  constructor(private router: Router){}
  routerToUserLogin(){
    this.router.navigate(['/login','user'])
  }
  routerToDriverLogin(){
    this.router.navigate(['/login','driver'])
  }
  routerToAdminLogin(){
    this.router.navigate(['/login','admin'])
  }

}
