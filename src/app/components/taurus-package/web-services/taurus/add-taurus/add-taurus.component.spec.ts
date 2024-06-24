import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaurusComponent } from './add-taurus.component';

describe('AddTaurusComponent', () => {
  let component: AddTaurusComponent;
  let fixture: ComponentFixture<AddTaurusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTaurusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaurusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
