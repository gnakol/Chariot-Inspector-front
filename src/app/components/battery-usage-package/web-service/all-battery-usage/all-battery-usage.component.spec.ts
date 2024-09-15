import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBatteryUsageComponent } from './all-battery-usage.component';

describe('AllBatteryUsageComponent', () => {
  let component: AllBatteryUsageComponent;
  let fixture: ComponentFixture<AllBatteryUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBatteryUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBatteryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
