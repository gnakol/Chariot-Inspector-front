import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProblemComponent } from './template-problem.component';

describe('TemplateProblemComponent', () => {
  let component: TemplateProblemComponent;
  let fixture: ComponentFixture<TemplateProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
