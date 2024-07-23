import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatteryUsageComponent } from './add-battery-usage.component';

describe('AddBatteryUsageComponent', () => {
  let component: AddBatteryUsageComponent;
  let fixture: ComponentFixture<AddBatteryUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBatteryUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBatteryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
