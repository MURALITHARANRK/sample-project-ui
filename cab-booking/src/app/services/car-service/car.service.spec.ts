import { TestBed } from '@angular/core/testing';

import { CarService } from './car.service';
import { provideHttpClient } from '@angular/common/http';

describe('CarserviceService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
