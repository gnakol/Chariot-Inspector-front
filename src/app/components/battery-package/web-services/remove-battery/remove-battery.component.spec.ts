import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveBatteryComponent } from './remove-battery.component';

describe('RemoveBatteryComponent', () => {
  let component: RemoveBatteryComponent;
  let fixture: ComponentFixture<RemoveBatteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveBatteryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveBatteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
