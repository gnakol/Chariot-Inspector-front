import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPickupComponent } from './search-pickup.component';

describe('SearchPickupComponent', () => {
  let component: SearchPickupComponent;
  let fixture: ComponentFixture<SearchPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchPickupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
