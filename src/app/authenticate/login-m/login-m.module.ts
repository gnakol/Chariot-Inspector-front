import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../login/login.component';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider'
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormField, MatInputModule, MatLabel} from '@angular/material/input';
import { HeaderComponent } from '../../views/header/header.component';
import { FooterComponent } from '../../views/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from '../../global/share/share.module';



@NgModule({
  declarations: [
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatLabel,
    MatFormField,
    MatToolbarModule,
    HttpClientModule,
    ShareModule
  ],
  exports: [
    HeaderComponent,
    LoginComponent
  ]
})
export class LoginMModule { }
