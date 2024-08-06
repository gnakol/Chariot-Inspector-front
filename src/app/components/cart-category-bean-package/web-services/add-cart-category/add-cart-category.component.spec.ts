import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCartCategoryComponent } from './add-cart-category.component';

describe('AddCartCategoryComponent', () => {
  let component: AddCartCategoryComponent;
  let fixture: ComponentFixture<AddCartCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCartCategoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCartCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
