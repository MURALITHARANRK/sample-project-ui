import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../../../../services/admin-service/admin.service';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userDetails:any
  constructor(private admin:AdminService){}
  ngOnInit(): void {
    this.admin.getAllUsers().subscribe(
      {
        next: (data)=>{
          console.log(data);
          this.userDetails = data
        },
        error: (error)=>{console.log(error);
        }
      }
    )
  }
}
