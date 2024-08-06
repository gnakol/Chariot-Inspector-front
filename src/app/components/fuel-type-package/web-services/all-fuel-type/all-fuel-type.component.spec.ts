import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFuelTypeComponent } from './all-fuel-type.component';

describe('AllFuelTypeComponent', () => {
  let component: AllFuelTypeComponent;
  let fixture: ComponentFixture<AllFuelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllFuelTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllFuelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
