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
import { SuiviComponent } from '../../suivi/suivi.component';
import { HeaderComponent } from '../../header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { ResumeComponent } from '../../../view-web-service/resume/resume.component';



@NgModule({
  declarations: [
    SuiviComponent,
    HeaderComponent,
    FooterComponent,
    ResumeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule
  ],
  exports : [
    SuiviComponent,
    HeaderComponent,
    FooterComponent,
    ResumeComponent
  ]
})
export class SuiviMModule { }
