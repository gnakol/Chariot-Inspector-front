import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBatteryUsageComponent } from './update-battery-usage.component';

describe('UpdateBatteryUsageComponent', () => {
  let component: UpdateBatteryUsageComponent;
  let fixture: ComponentFixture<UpdateBatteryUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBatteryUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBatteryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
