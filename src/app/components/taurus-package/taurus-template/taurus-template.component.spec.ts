import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaurusTemplateComponent } from './taurus-template.component';

describe('TaurusTemplateComponent', () => {
  let component: TaurusTemplateComponent;
  let fixture: ComponentFixture<TaurusTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaurusTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaurusTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
