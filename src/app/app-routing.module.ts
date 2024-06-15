import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginComponent } from './authenticate/login/login.component';
import { DashboardComponent } from './components/dashboard-global/dashboard/dashboard.component';
import { CartComponent } from './components/cart-package/cart-dashboard/cart.component';
import { AllCartComponent } from './components/cart-package/web-services/all-cart/all-cart.component';
import { AddCartComponent } from './components/cart-package/web-services/add-cart/add-cart.component';
import { SuiviComponent } from './components/suivi-dashboard/suivi/suivi.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: 'cart', component: CartComponent }
    ]
  },
  { path: 'all-cart', component: AllCartComponent },
  { path: 'add-new-cart', component: AddCartComponent },
  { path: '*', redirectTo: 'home' },
  { path: 'suivi', component : SuiviComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
