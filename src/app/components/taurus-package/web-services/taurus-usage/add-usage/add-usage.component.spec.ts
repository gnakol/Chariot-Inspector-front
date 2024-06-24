import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsageComponent } from './add-usage.component';

describe('AddUsageComponent', () => {
  let component: AddUsageComponent;
  let fixture: ComponentFixture<AddUsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUsageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
