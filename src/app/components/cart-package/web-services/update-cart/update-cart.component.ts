import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../bean/cart';

@Component({
  selector: 'app-update-cart',
  templateUrl: './update-cart.component.html',
  styleUrls: ['./update-cart.component.scss']
})
export class UpdateCartComponent implements OnInit {
  cartForm!: FormGroup;
  cartId!: number;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cartId = +this.route.snapshot.paramMap.get('idCart')!;
    this.cartForm = this.fb.group({
      cartNumber: ['', Validators.required],
      manufacturerName: ['', Validators.required],
      categoryName: ['', Validators.required],
      fuelTypeName: ['', Validators.required]
    });

    this.loadCartData();
  }

  loadCartData(): void {
    this.cartService.getCartById(this.cartId).subscribe(cart => {
      this.cartForm.patchValue(cart);
    }, error => {
      console.error('Erreur lors du chargement des données du chariot: ', error);
    });
  }

  // onSubmit(): void {
  //   if (this.cartForm.valid) {
  //     const updatedCart: Cart = { ...this.cartForm.value, idCart: this.cartId };
  //     this.cartService.updateCart(this.cartId, updatedCart).subscribe(
  //       () => {
  //         console.log('Chariot mis à jour avec succès');
  //         this.router.navigate(['/dashboard/all-cart']);
  //       },
  //       error => {
  //         console.log('Erreur lors de la mise à jour du chariot', error);
  //       }
  //     );
  //   }
  // }
}
