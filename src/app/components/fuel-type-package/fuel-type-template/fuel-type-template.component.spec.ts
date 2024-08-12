import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelTypeTemplateComponent } from './fuel-type-template.component';

describe('FuelTypeTemplateComponent', () => {
  let component: FuelTypeTemplateComponent;
  let fixture: ComponentFixture<FuelTypeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FuelTypeTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuelTypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
