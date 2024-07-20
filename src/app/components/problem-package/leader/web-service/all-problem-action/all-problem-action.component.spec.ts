import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProblemActionComponent } from './all-problem-action.component';

describe('AllProblemActionComponent', () => {
  let component: AllProblemActionComponent;
  let fixture: ComponentFixture<AllProblemActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProblemActionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProblemActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
