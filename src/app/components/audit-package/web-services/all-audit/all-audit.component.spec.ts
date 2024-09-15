import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAuditComponent } from './all-audit.component';

describe('AllAuditComponent', () => {
  let component: AllAuditComponent;
  let fixture: ComponentFixture<AllAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAuditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
