import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalDetailsModalComponent } from './personal-details-modal.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user-service/user.service';
import { of } from 'rxjs';
import { ElementRef } from '@angular/core';

describe('PersonalDetailsModalComponent', () => {
  let component: PersonalDetailsModalComponent;
  let fixture: ComponentFixture<PersonalDetailsModalComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let modalClose: ElementRef;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['setUserDetails']);

    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,  // Ensure HttpTestingModule is imported
        PersonalDetailsModalComponent // Import the standalone component
      ],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(PersonalDetailsModalComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    httpMock = TestBed.inject(HttpTestingController);

    // Create a mock modal close element reference
    modalClose = { nativeElement: { click: jasmine.createSpy('click') } } as unknown as ElementRef;

    component.modalClose = modalClose;
    fixture.detectChanges();
  });

  it('should make an HTTP request to /user/create and handle response correctly', () => {
    const userDetails = {
      name: 'John Doe',
      emailaddress: 'johndoe@example.com',
      contactnumber: '1234567890',
    };

    component.userDetails = userDetails;
    component.ngOnChanges({
      userDetails: { currentValue: userDetails, previousValue: undefined, firstChange: true, isFirstChange: () => true },
    });

    // Simulate a successful HTTP response
    const mockResponse = { status: 'success' };
    userService.setUserDetails.and.returnValue(of(mockResponse));  // Return mock response

    // Trigger the submit method
    component.submit();

    // Expect the HTTP request to have been made to the correct URL
    const req = httpMock.expectOne((request) => request.url.includes('/user/create'));  // Match URL for /user/create
    expect(req.request.method).toBe('POST');  // Check that the request is a POST method
    req.flush(mockResponse);  // Return the mock response to complete the request

    // Verify that the service was called with the correct data
    expect(userService.setUserDetails).toHaveBeenCalledWith(userDetails);

    // Verify that the modal close click method was called
    expect(modalClose.nativeElement.click).toHaveBeenCalled();

    // Verify the userDetailsNotAvailable flag is updated correctly
    expect(component.userDetailsNotAvailable).toBe(false);
  });

  it('should handle error response correctly', () => {
    const userDetails = {
      name: 'John Doe',
      emailaddress: 'johndoe@example.com',
      contactnumber: '1234567890',
    };

    component.userDetails = userDetails;
    component.ngOnChanges({
      userDetails: { currentValue: userDetails, previousValue: undefined, firstChange: true, isFirstChange: () => true },
    });

    // Simulate an error response
    const mockErrorResponse = { status: 'error' };
    userService.setUserDetails.and.returnValue(of(mockErrorResponse));

    // Trigger the submit method
    component.submit();

    const req = httpMock.expectOne((request) => request.url.includes('/user/create'));  // Ensure this URL is correct
    expect(req.request.method).toBe('POST');
    req.flush(mockErrorResponse, { status: 400, statusText: 'Bad Request' });

    // Verify that the service was called with the correct data
    expect(userService.setUserDetails).toHaveBeenCalledWith(userDetails);

    // Verify the userDetailsNotAvailable flag is updated correctly
    expect(component.userDetailsNotAvailable).toBe(true);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that no outstanding requests are there
    fixture.destroy();
  });
});
