import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerTemplateComponent } from './manufacturer-template.component';

describe('ManufacturerTemplateComponent', () => {
  let component: ManufacturerTemplateComponent;
  let fixture: ComponentFixture<ManufacturerTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManufacturerTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
