import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceBeanComponent } from './add-service-bean.component';

describe('AddServiceBeanComponent', () => {
  let component: AddServiceBeanComponent;
  let fixture: ComponentFixture<AddServiceBeanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServiceBeanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceBeanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
