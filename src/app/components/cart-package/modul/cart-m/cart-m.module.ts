import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CartComponent } from '../../cart-dashboard/cart.component';
import { ShareModule } from '../../../../global/share/share.module';
import { AllCartComponent } from '../../web-services/all-cart/all-cart.component';
import { AddCartComponent } from '../../web-services/add-cart/add-cart.component';
import { CartRoutingModule } from '../../cart-routing.module';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 



@NgModule({
  declarations: [
    CartComponent,
    AllCartComponent,
    AddCartComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    ShareModule,
    RouterModule,
    //CartRoutingModule,
    MatFormFieldModule,
    MatLabel,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [
    CartComponent,
    AllCartComponent,
    AddCartComponent
  ]
})
export class CartMModule { }
