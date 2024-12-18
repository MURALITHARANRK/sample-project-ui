import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInformationComponent } from './car-information.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from '../../../../app.routes';



describe('CarInformationComponent', () => {
  let component: CarInformationComponent;
  let fixture: ComponentFixture<CarInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInformationComponent],
      providers:[provideHttpClient(),provideRouter(routes)],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
