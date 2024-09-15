import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBatteryUsageComponent } from './detail-battery-usage.component';

describe('DetailBatteryUsageComponent', () => {
  let component: DetailBatteryUsageComponent;
  let fixture: ComponentFixture<DetailBatteryUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailBatteryUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBatteryUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
