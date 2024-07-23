import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../bean/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  cartForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cartForm = this.fb.group({
      cartNumber: ['', [Validators.required, Validators.pattern('^[0-9a-zA-Z]*$')]],
      brand: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cartForm.valid) {
      const newCart: Cart = this.cartForm.value;
      this.cartService.addNewCart(newCart).subscribe(
        (data) => {
          console.log('Chariot ajouté avec succès', data);
          this.router.navigate(['/dashboard/cart-template']);
        },
        (error) => {
          console.log('Erreur lors de l\'ajout du chariot', error);
        }
      );
    }
  }
}
