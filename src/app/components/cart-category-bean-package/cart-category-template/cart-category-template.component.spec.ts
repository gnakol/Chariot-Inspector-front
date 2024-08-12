import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartCategoryTemplateComponent } from './cart-category-template.component';

describe('CartCategoryTemplateComponent', () => {
  let component: CartCategoryTemplateComponent;
  let fixture: ComponentFixture<CartCategoryTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartCategoryTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartCategoryTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
