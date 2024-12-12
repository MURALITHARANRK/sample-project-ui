import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [CommonModule, GoogleMap],
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent {
  center: any = {lat: 24, lng: 12};
  zoom = 4;
  display!: any;

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event.latLng?.toJSON());
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng?.toJSON();
  }
}
