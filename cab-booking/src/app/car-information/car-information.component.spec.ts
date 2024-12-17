import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarInformationComponent } from './car-information.component';

describe('CarInformationComponent', () => {
  let component: CarInformationComponent;
  let fixture: ComponentFixture<CarInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarInformationComponent]
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
