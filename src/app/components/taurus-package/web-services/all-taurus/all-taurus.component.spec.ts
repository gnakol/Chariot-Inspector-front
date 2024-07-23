import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTaurusComponent } from './all-taurus.component';

describe('AllTaurusComponent', () => {
  let component: AllTaurusComponent;
  let fixture: ComponentFixture<AllTaurusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllTaurusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllTaurusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
