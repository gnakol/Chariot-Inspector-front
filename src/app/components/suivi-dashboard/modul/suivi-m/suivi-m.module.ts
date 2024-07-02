import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import {MatTreeModule} from '@angular/material/tree'; 
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
import { AddIssueComponent } from '../../../issue-package/web-services/add-issue/add-issue.component';
import { HistoricalComponent } from '../../../view-web-service/chronology/historical/historical.component';





// *************************************************

import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormField, MatInputModule} from '@angular/material/input';
import { FormsModule  } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
// ***********************************************










@NgModule({
  declarations: [
    SuiviComponent,
    HeaderComponent,
    FooterComponent,
    ResumeComponent,
    AddBatteryComponent,
    AddUsageComponent,
    AddPickupComponent, 
    AddIssueComponent,
    HistoricalComponent
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
    ReactiveFormsModule,
    MatTreeModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule
    
  ],
  exports : [
    SuiviComponent,
    HeaderComponent,
    FooterComponent,
    ResumeComponent,
    AddBatteryComponent,
    AddUsageComponent,
    AddPickupComponent, 
    AddIssueComponent,
    HistoricalComponent
  ]
})
export class SuiviMModule { }
