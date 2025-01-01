import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CarService } from './car.service';
import { AuthService } from '../auth-service/auth.service';
import { environment } from '../../environment/environment';
import { of } from 'rxjs';

describe('CarService', () => {
  let service: CarService;
  let httpMock: HttpTestingController;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['mockData$']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CarService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    service = TestBed.inject(CarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return car details from AuthService.mockData$', () => {
    const mockData = [{ car: 'Test Car' }];
    mockAuthService.mockData$ = of(mockData);

    service.getCarDetails().subscribe((data) => {
      expect(data).toEqual(mockData);
    });
  });

  it('should fetch available car data via GET request', () => {
    const mockCarData = [{ id: 1, car: 'Test Car' }];
    service.getCarData().subscribe((data) => {
      expect(data).toEqual(mockCarData);
    });

    const req = httpMock.expectOne(`${environment.API_URL}user/available`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCarData);
  });

  it('should fetch booking details for a given car ID', () => {
    const carId = 123;
    const mockBookingDetails = { bookingId: 456 };

    service.getBookingDetails(carId).subscribe((data) => {
      expect(data).toEqual(mockBookingDetails);
    });

    const req = httpMock.expectOne(`${environment.API_URL}car/booking?carid=${carId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBookingDetails);
  });

  it('should send a PUT request to accept a ride for a given car ID', () => {
    const carId = 123;
    const mockResponse = 'Ride accepted';

    service.acceptRide(carId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.API_URL}car/accept?carid=${carId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual('');
    req.flush(mockResponse);
  });
});

