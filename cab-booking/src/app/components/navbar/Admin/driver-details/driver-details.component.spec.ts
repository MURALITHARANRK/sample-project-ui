import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverDetailsComponent } from './driver-details.component';
import { AdminService } from '../../../../services/admin-service/admin.service';
import { of, throwError } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DriverDetailsComponent', () => {
  let component: DriverDetailsComponent;
  let fixture: ComponentFixture<DriverDetailsComponent>;
  let adminService: jasmine.SpyObj<AdminService>;
  let paginator: MatPaginator;
  let sort: MatSort;

  beforeEach(() => {
    const adminServiceSpy = jasmine.createSpyObj('AdminService', ['getDriverDetails']);

    TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      declarations: [DriverDetailsComponent],
      providers: [
        { provide: AdminService, useValue: adminServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(DriverDetailsComponent);
    component = fixture.componentInstance;
    adminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;
    sort = fixture.debugElement.query(By.directive(MatSort)).componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize paginator and sort', () => {
    expect(component.dataSource.paginator).toBe(paginator);
    expect(component.dataSource.sort).toBe(sort);
  });

  it('should fetch driver details on init and update dataSource', () => {
    const mockDriverData = [
      { id: 1, username: 'driver1' },
      { id: 2, username: 'driver2' },
    ];
    adminService.getDriverDetails.and.returnValue(of(mockDriverData));

    component.ngOnInit();

    expect(adminService.getDriverDetails).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(mockDriverData);
  });

  it('should handle error when fetching driver details fails', () => {
    const errorResponse = new Error('Error fetching driver details');
    adminService.getDriverDetails.and.returnValue(throwError(errorResponse));

    component.ngOnInit();

    expect(adminService.getDriverDetails).toHaveBeenCalled();
    // You can spy on console.error if you want to verify the error handling in the component.
    spyOn(console, 'error');
    expect(console.error).toHaveBeenCalledWith('Error fetching driver details:', errorResponse);
  });

  it('should apply filter correctly to the table data', () => {
    const mockDriverData = [
      { id: 1, username: 'driver1' },
      { id: 2, username: 'driver2' },
      { id: 3, username: 'driver3' }
    ];
    component.dataSource.data = mockDriverData;
  
    // Correcting the type issue
    const event = { target: { value: 'driver2' } } as unknown as Event;  // Cast to unknown first, then Event
  
    component.applyFilter(event);
  
    expect(component.dataSource.filter).toBe('driver2');
    expect(component.dataSource.filteredData).toEqual([{ id: 2, username: 'driver2' }]);
  });
  
  it('should call paginator.firstPage() when filter is applied', () => {
    const mockDriverData = [
      { id: 1, username: 'driver1' },
      { id: 2, username: 'driver2' }
    ];
    component.dataSource.data = mockDriverData;
  
    // Create a spy for paginator.firstPage()
    const paginatorSpy = spyOn(paginator, 'firstPage');
  
    // Correct event type casting
    const event = { target: { value: 'driver2' } } as unknown as Event; // Cast to unknown first, then Event
    
    component.applyFilter(event);
  
    expect(paginatorSpy).toHaveBeenCalled();
  });
  
});
