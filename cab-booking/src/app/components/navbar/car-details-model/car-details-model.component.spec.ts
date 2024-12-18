import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsModelComponent } from './car-details-model.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';

describe('CarDetailsModelComponent', () => {
  let component: CarDetailsModelComponent;
  let fixture: ComponentFixture<CarDetailsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailsModelComponent],
      providers: [provideHttpClient(), provideRouter(routes)]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailsModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
