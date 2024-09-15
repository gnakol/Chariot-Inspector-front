import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PickupService } from '../../service/pickup.service';
import { CartService } from '../../../cart-package/service/cart.service';
import { Pickup } from '../../bean/pickup';

@Component({
  selector: 'app-detail-pickup',
  templateUrl: './detail-pickup.component.html',
  styleUrls: ['./detail-pickup.component.scss']
})
export class DetailPickupComponent implements OnInit {

  pickup!: Pickup;
  cartNumber!: string;

  constructor(
    private route: ActivatedRoute,
    private pickupService: PickupService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadPickupDetails();
  }

  loadPickupDetails(): void {
    const idPickup = this.route.snapshot.paramMap.get('id');
    if (idPickup) {
      this.pickupService.getPickupById(+idPickup).subscribe(
        data => {
          this.pickup = data;
          this.loadCartNumber();
        },
        error => {
          console.error('Erreur lors de la récupération du pickup:', error);
        }
      );
    }
  }

  loadCartNumber(): void {
    this.cartService.getCartById(this.pickup.cartId).subscribe(
      cart => {
        this.cartNumber = cart.cartNumber;
      },
      error => {
        console.error('Erreur lors de la récupération du numéro de chariot:', error);
      }
    );
  }
}
