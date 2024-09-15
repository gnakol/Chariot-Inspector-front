import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPickupComponent } from './detail-pickup.component';

describe('DetailPickupComponent', () => {
  let component: DetailPickupComponent;
  let fixture: ComponentFixture<DetailPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPickupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
