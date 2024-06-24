import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsageComponent } from './all-usage.component';

describe('AllUsageComponent', () => {
  let component: AllUsageComponent;
  let fixture: ComponentFixture<AllUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
