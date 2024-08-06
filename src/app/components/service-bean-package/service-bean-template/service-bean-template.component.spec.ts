import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceBeanTemplateComponent } from './service-bean-template.component';

describe('ServiceBeanTemplateComponent', () => {
  let component: ServiceBeanTemplateComponent;
  let fixture: ComponentFixture<ServiceBeanTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceBeanTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceBeanTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
