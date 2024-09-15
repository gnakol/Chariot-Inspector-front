import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePickupComponent } from './remove-pickup.component';

describe('RemovePickupComponent', () => {
  let component: RemovePickupComponent;
  let fixture: ComponentFixture<RemovePickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemovePickupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
