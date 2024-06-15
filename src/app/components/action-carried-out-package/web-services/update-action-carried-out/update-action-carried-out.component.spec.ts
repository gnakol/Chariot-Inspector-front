import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActionCarriedOutComponent } from './update-action-carried-out.component';

describe('UpdateActionCarriedOutComponent', () => {
  let component: UpdateActionCarriedOutComponent;
  let fixture: ComponentFixture<UpdateActionCarriedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateActionCarriedOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateActionCarriedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
