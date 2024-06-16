import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(private route : Router){}

  allCart()
  {
    this.route.navigateByUrl("/all-cart");
  }

  createCart(){

    this.route.navigateByUrl("/suivi");

  }

  updateCart(){

  }

  deleteCart(){

  }

  searchCart(){

    this.route.navigateByUrl("/get-account-by-id");
  }

}
