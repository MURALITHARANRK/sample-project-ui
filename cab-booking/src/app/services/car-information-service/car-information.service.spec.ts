import { TestBed } from '@angular/core/testing';

import { CarInformationService } from './services/car-information-service/car-information.service';

describe('CarInformationService', () => {
  let service: CarInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
