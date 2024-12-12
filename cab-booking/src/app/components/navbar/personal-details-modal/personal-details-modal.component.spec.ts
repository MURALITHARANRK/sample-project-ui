import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDetailsModalComponent } from './personal-details-modal.component';

describe('PersonalDetailsModalComponent', () => {
  let component: PersonalDetailsModalComponent;
  let fixture: ComponentFixture<PersonalDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalDetailsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
