import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCartComponent } from './all-cart.component';

describe('AllCartComponent', () => {
  let component: AllCartComponent;
  let fixture: ComponentFixture<AllCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
