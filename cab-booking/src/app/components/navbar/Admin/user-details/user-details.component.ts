import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AdminService } from '../../../../services/admin-service/admin.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatFormFieldModule, MatTableModule, MatInputModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userDetails:any
  displayedColumns: string[] = ['customerid', 'name', 'contactnumber', 'emailaddress'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private admin:AdminService){}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.admin.getAllUsers().subscribe(
      {
        next: (data:any)=>{
          console.log(data);
          this.userDetails = data
          this.dataSource.data = data;
        },
        error: (error)=>{console.log(error);
        }
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
