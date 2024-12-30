import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverDetailsComponent } from './driver-details.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from '../../../../app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('DriverDetailsComponent', () => {
  let component: DriverDetailsComponent;
  let fixture: ComponentFixture<DriverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverDetailsComponent],
      providers: [provideHttpClient(), provideRouter(routes),provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
