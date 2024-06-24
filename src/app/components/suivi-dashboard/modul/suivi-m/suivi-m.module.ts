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
import { BatteryMModule } from '../../../battery-package/modul/battery-m/battery-m.module';
import { AddBatteryComponent } from '../../../battery-package/web-services/add-battery/add-battery.component';
import { AddUsageComponent } from '../../../taurus-package/web-services/taurus-usage/add-usage/add-usage.component';
import { AddPickupComponent } from '../../../pickup-package/web-services/add-pickup/add-pickup.component';



@NgModule({
  declarations: [
    SuiviComponent,
    HeaderComponent,
    FooterComponent,
    ResumeComponent,
    AddBatteryComponent,
    AddUsageComponent,
    AddPickupComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports : [
    SuiviComponent,
    HeaderComponent,
    FooterComponent,
    ResumeComponent,
    AddBatteryComponent,
    AddUsageComponent,
    AddPickupComponent
  ]
})
export class SuiviMModule { }
