import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllIssueComponent } from './all-issue.component';

describe('AllIssueComponent', () => {
  let component: AllIssueComponent;
  let fixture: ComponentFixture<AllIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllIssueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
