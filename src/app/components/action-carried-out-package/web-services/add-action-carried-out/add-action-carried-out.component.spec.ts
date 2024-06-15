import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActionCarriedOutComponent } from './add-action-carried-out.component';

describe('AddActionCarriedOutComponent', () => {
  let component: AddActionCarriedOutComponent;
  let fixture: ComponentFixture<AddActionCarriedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddActionCarriedOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddActionCarriedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
