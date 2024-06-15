import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllActionCarriedOutComponent } from './all-action-carried-out.component';

describe('AllActionCarriedOutComponent', () => {
  let component: AllActionCarriedOutComponent;
  let fixture: ComponentFixture<AllActionCarriedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllActionCarriedOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllActionCarriedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
