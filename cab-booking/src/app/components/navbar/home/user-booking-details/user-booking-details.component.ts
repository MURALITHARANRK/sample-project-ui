import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user-service/user.service';

@Component({
  selector: 'app-user-booking-details',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './user-booking-details.component.html',
  styleUrl: './user-booking-details.component.css'
})
export class UserBookingDetailsComponent implements OnInit {
  displayedColumns: string[] = ['source', 'destination', 'starttime', 'endtime'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private user: UserService) {
  }

  async getBookingDetails(): Promise<void> {
    const userid = localStorage.getItem('id');
    this.user.getBookingDetails(userid).subscribe({
      next: async (data: any) => {
        console.log(data);
  
        this.dataSource.data = await this.processAddresses(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  
  async processAddresses(data: any[]): Promise<any[]> {
    const promises = data.map(async (booking) => {
      const sourceAddress = await this.findAddress(booking.source);
      const destinationAddress = await this.findAddress(booking.destination);
  
      return {
        ...booking,
        source: sourceAddress,
        destination: destinationAddress,
      };
    });
  
    return Promise.all(promises); // Wait for all address resolutions
  }
  
  async findAddress(location: string): Promise<string> {
    const [lat, lng] = location.split(',').map((coord: string) => parseFloat(coord.trim()));
  
    return new Promise((resolve) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode(
        { location: { lat, lng } },
        (results: any, status: any) => {
          if (status === 'OK' && results.length > 0) {
            resolve(results[0].formatted_address);
          } else {
            resolve('No address found');
          }
        }
      );
    });
  }
  

  ngOnInit(): void {
    this.getBookingDetails()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}