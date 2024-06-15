import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBatteryComponent } from './update-battery.component';

describe('UpdateBatteryComponent', () => {
  let component: UpdateBatteryComponent;
  let fixture: ComponentFixture<UpdateBatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBatteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
