import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWareHouseComponent } from './all-ware-house.component';

describe('AllWareHouseComponent', () => {
  let component: AllWareHouseComponent;
  let fixture: ComponentFixture<AllWareHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllWareHouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllWareHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
