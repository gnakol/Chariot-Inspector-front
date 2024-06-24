import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPickupComponent } from './all-pickup.component';

describe('AllPickupComponent', () => {
  let component: AllPickupComponent;
  let fixture: ComponentFixture<AllPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllPickupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
