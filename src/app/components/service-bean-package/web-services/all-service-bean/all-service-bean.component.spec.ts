import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllServiceBeanComponent } from './all-service-bean.component';

describe('AllServiceBeanComponent', () => {
  let component: AllServiceBeanComponent;
  let fixture: ComponentFixture<AllServiceBeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllServiceBeanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllServiceBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
