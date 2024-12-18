import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRideComponent } from './driver-ride.component';
import { provideHttpClient } from '@angular/common/http';

describe('DriverRideComponent', () => {
  let component: DriverRideComponent;
  let fixture: ComponentFixture<DriverRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverRideComponent],
      providers: [provideHttpClient()]

    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
