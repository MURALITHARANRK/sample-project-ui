import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsModelComponent } from './car-details-model.component';

describe('CarDetailsModelComponent', () => {
  let component: CarDetailsModelComponent;
  let fixture: ComponentFixture<CarDetailsModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarDetailsModelComponent]
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
