import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBatteryComponent } from './all-battery.component';

describe('AllBatteryComponent', () => {
  let component: AllBatteryComponent;
  let fixture: ComponentFixture<AllBatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllBatteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
