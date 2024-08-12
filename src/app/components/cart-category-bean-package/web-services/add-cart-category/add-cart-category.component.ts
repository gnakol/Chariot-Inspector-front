import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartCategoryService } from '../../service/cart-category.service';
import { Router } from '@angular/router';
import { CartCategoryDTO } from '../../bean/cart-category';

@Component({
  selector: 'app-add-cart-category',
  templateUrl: './add-cart-category.component.html',
  styleUrls: ['./add-cart-category.component.scss']
})
export class AddCartCategoryComponent implements OnInit {
  cartCategoryForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartCategoryService: CartCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cartCategoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cartCategoryForm.valid) {
      const newCartCategory: CartCategoryDTO = this.cartCategoryForm.value;
      this.cartCategoryService.addNewCartCategory(newCartCategory).subscribe(
        (data) => {
          console.log('Cart Category added successfully', data);
          this.router.navigate(['/dashboard/cart-category-template']);
        },
        (error) => {
          console.error('Error adding cart category', error);
        }
      );
    }
  }
}
