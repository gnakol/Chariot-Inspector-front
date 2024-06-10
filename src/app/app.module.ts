import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeMModule } from './views/home-m/home-m.module';
import { LoginMModule } from './authenticate/login-m/login-m.module';
import { DashboardComponent } from './components/dashboard-global/dashboard/dashboard.component';
import { DashboardMModule } from './components/dashboard-global/dashboard-m/dashboard-m.module';
import { ShareModule } from './global/share/share.module';
import { CartComponent } from './components/cart-package/cart-dashboard/cart.component';
import { CartMModule } from './components/cart-package/modul/cart-m/cart-m.module';
import { AllCartComponent } from './components/cart-package/web-services/all-cart/all-cart.component';
import { AddCartComponent } from './components/cart-package/web-services/add-cart/add-cart.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeMModule,
    LoginMModule,
    DashboardMModule,
    CartMModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
