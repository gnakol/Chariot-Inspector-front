import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseTemplateComponent } from './ware-house-template.component';

describe('WareHouseTemplateComponent', () => {
  let component: WareHouseTemplateComponent;
  let fixture: ComponentFixture<WareHouseTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WareHouseTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WareHouseTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
