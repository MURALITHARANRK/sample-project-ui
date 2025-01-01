import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../../services/admin-service/admin.service';
import { CarDetailsModelComponent } from '../../car-details-model/car-details-model.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-car-information',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule,
    MatButtonModule,
    CarDetailsModelComponent,
  ],
  templateUrl: './car-information.component.html',
  styleUrls: ['./car-information.component.css'],
})
export class CarInformationComponent implements OnInit {
  displayedColumns: string[] = ['registrationNumber', 'brand', 'model'];
  dataSource = new MatTableDataSource<Car>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  carDetails: Car[] = [];
  childData: any;

  constructor(private admin: AdminService, private active: ActivatedRoute) {}

  ngOnInit(): void {
    const driverId = this.active.snapshot.paramMap.get('id');
    if (driverId) {
      this.admin.getCarDetailsById(driverId).subscribe({
        next: (cars: Car[]) => {
          this.carDetails = cars;
          this.dataSource.data = cars;
          console.log(cars);
        },
        error: (err) => console.error('Error:', err),
      });
    }

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

interface Car {
  registrationNumber: string;
  brand: string;
  model: string;
}
