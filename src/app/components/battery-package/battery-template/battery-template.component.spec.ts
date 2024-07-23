import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatteryTemplateComponent } from './battery-template.component';

describe('BatteryTemplateComponent', () => {
  let component: BatteryTemplateComponent;
  let fixture: ComponentFixture<BatteryTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BatteryTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatteryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
