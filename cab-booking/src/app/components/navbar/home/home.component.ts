import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  x=12;
  y="Not in a ride";
  userType:any
  constructor(private http: HttpClient, private auth: AuthService){}
  ngOnInit(): void {
    this.userType = this.auth.getUserType()
  }


}
