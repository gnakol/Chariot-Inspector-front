import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart-dashboard/cart.component';
import { AllCartComponent } from './web-services/all-cart/all-cart.component';
import { AddCartComponent } from './web-services/add-cart/add-cart.component';

const routes: Routes = [
  { path: '', component: CartComponent},
  { path: 'all-cart', component: AllCartComponent },
  { path: 'add-cart', component: AddCartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
