import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBookingComponent } from './user-booking.component';
import { provideHttpClient } from '@angular/common/http';

describe('UserBookingComponent', () => {
  let component: UserBookingComponent;
  let fixture: ComponentFixture<UserBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserBookingComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
