import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveActionCarriedOutComponent } from './remove-action-carried-out.component';

describe('RemoveActionCarriedOutComponent', () => {
  let component: RemoveActionCarriedOutComponent;
  let fixture: ComponentFixture<RemoveActionCarriedOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveActionCarriedOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveActionCarriedOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
