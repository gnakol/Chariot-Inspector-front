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
import { MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
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
import { RouterModule } from '@angular/router'; 

import { MatDialogModule } from '@angular/material/dialog';





// *************************************************

import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormField, MatInputModule} from '@angular/material/input';
import { FormsModule  } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { TemplateComponent } from '../../../admin-package/component/template/template.component';
import { UserHomeComponent } from '../../../user-package/user-home/user-home.component';
import { AllUserComponent } from '../../../user-package/web-services/all-user/all-user.component';
import { UpdateUserComponent } from '../../../user-package/web-services/update-user/update-user.component';
import { ConfirmationDialogComponent } from '../../../other-package/composant/confirmation-dialog/confirmation-dialog.component';
import { TemplateProblemComponent } from '../../../problem-package/template-problem/template-problem.component';
import { HomeLeaderComponent } from '../../../problem-package/leader/home-leader/home-leader.component';
import { AllProblemActionComponent } from '../../../problem-package/leader/web-service/all-problem-action/all-problem-action.component';
import { IssueSearchComponent } from '../../../issue-package/web-services/issue-search/issue-search.component';
import { AddBatteryUsageComponent } from '../../../battery-usage-package/web-service/add-battery-usage/add-battery-usage.component';
import { CartTemplateComponent } from '../../../cart-package/cart-template/cart-template.component';
import { TaurusTemplateComponent } from '../../../taurus-package/taurus-template/taurus-template.component';
import { BatteryTemplateComponent } from '../../../battery-package/battery-template/battery-template.component';
import { AllTaurusComponent } from '../../../taurus-package/web-services/all-taurus/all-taurus.component';
import { AllBatteryComponent } from '../../../battery-package/web-services/all-battery/all-battery.component';
import { AddActionCarriedOutComponent } from '../../../action-carried-out-package/web-services/add-action-carried-out/add-action-carried-out.component';
import { AllActionCarriedOutComponent } from '../../../action-carried-out-package/web-services/all-action-carried-out/all-action-carried-out.component';
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
    HistoricalComponent,
    TemplateComponent,
    UserHomeComponent,
    AllUserComponent,
    UpdateUserComponent,
    ConfirmationDialogComponent,
    TemplateProblemComponent,
    HomeLeaderComponent,
    AllProblemActionComponent,
    IssueSearchComponent,
    AddBatteryUsageComponent,
    CartTemplateComponent,
    TaurusTemplateComponent,
    BatteryTemplateComponent,
    AllTaurusComponent,
    AllBatteryComponent,
    AddActionCarriedOutComponent,
    AllActionCarriedOutComponent
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
    MatPaginatorModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    MatInputModule
    
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
    HistoricalComponent,
    TemplateComponent,
    UserHomeComponent,
    AllUserComponent,
    UpdateUserComponent,
    ConfirmationDialogComponent,
    TemplateProblemComponent,
    HomeLeaderComponent,
    AllProblemActionComponent,
    IssueSearchComponent,
    AddBatteryUsageComponent,
    CartTemplateComponent,
    TaurusTemplateComponent,
    BatteryTemplateComponent,
    AllTaurusComponent,
    AllBatteryComponent,
    AddActionCarriedOutComponent,
    AllActionCarriedOutComponent
  ]
})
export class SuiviMModule { }
