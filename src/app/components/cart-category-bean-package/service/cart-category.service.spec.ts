import { TestBed } from '@angular/core/testing';

import { CartCategoryService } from './cart-category.service';

describe('CartCategoryService', () => {
  let service: CartCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
