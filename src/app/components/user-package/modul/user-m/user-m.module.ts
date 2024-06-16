import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { ShareModule } from '../../../../global/share/share.module';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select'; 
import { AddUserComponent } from '../../web-services/add-user/add-user.component';
import { GetAccountByIdComponent } from '../../web-services/get-account-by-id/get-account-by-id.component';



@NgModule({
  declarations: [
    AddUserComponent,
    GetAccountByIdComponent
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
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatLabel
  ],
  exports : [
    AddUserComponent,
    GetAccountByIdComponent
  ]
})
export class UserMModule { }
