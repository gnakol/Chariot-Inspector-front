import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCartCategoryComponent } from './all-cart-category.component';

describe('AllCartCategoryComponent', () => {
  let component: AllCartCategoryComponent;
  let fixture: ComponentFixture<AllCartCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllCartCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllCartCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
