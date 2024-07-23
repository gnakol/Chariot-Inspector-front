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
import { AllBatteryComponent } from './components/battery-package/web-services/all-battery/all-battery.component';
import { AddBatteryComponent } from './components/battery-package/web-services/add-battery/add-battery.component';
import { RemoveBatteryComponent } from './components/battery-package/web-services/remove-battery/remove-battery.component';
import { UpdateBatteryComponent } from './components/battery-package/web-services/update-battery/update-battery.component';
import { UpdateUserComponent } from './components/user-package/web-services/update-user/update-user.component';
import { AllUserComponent } from './components/user-package/web-services/all-user/all-user.component';
import { AddUserComponent } from './components/user-package/web-services/add-user/add-user.component';
import { RemoveUserComponent } from './components/user-package/web-services/remove-user/remove-user.component';
import { AllIssueComponent } from './components/issue-package/web-services/all-issue/all-issue.component';
import { AddIssueComponent } from './components/issue-package/web-services/add-issue/add-issue.component';
import { UpdateIssueComponent } from './components/issue-package/web-services/update-issue/update-issue.component';
import { RemoveIssueComponent } from './components/issue-package/web-services/remove-issue/remove-issue.component';
import { RemoveActionCarriedOutComponent } from './components/action-carried-out-package/web-services/remove-action-carried-out/remove-action-carried-out.component';
import { UpdateActionCarriedOutComponent } from './components/action-carried-out-package/web-services/update-action-carried-out/update-action-carried-out.component';
import { AddActionCarriedOutComponent } from './components/action-carried-out-package/web-services/add-action-carried-out/add-action-carried-out.component';
import { AllActionCarriedOutComponent } from './components/action-carried-out-package/web-services/all-action-carried-out/all-action-carried-out.component';
import { SuiviComponent } from './components/suivi-dashboard/suivi/suivi.component';
import { SuiviMModule } from './components/suivi-dashboard/modul/suivi-m/suivi-m.module';
import { HeaderComponent } from './components/suivi-dashboard/header/header.component';
import { FooterComponent } from './components/suivi-dashboard/footer/footer.component';
import { UserMModule } from './components/user-package/modul/user-m/user-m.module';
import { GetAccountByIdComponent } from './components/user-package/web-services/get-account-by-id/get-account-by-id.component';
import { ResumeComponent } from './components/view-web-service/resume/resume.component';
import { AllUsageComponent } from './components/taurus-package/web-services/taurus-usage/all-usage/all-usage.component';
import { AddTaurusComponent } from './components/taurus-package/web-services/taurus/add-taurus/add-taurus.component';
import { AddPickupComponent } from './components/pickup-package/web-services/add-pickup/add-pickup.component';
import { AllPickupComponent } from './components/pickup-package/web-services/all-pickup/all-pickup.component';
import { HistoricalComponent } from './components/view-web-service/chronology/historical/historical.component';
import { AllSessionComponent } from './components/work-session-package/web-service/all-session/all-session.component';
import { ConfirmationDialogComponent } from './components/other-package/composant/confirmation-dialog/confirmation-dialog.component';
import { AddAccountTeamComponent } from './components/account-team-package/web-service/add-account-team/add-account-team.component';
import { AllAccountTeamComponent } from './components/account-team-package/web-service/all-account-team/all-account-team.component';
import { DeleteAccountTeamComponent } from './components/account-team-package/web-service/delete-account-team/delete-account-team.component';
import { AddTeamComponent } from './components/team-package/web-service/add-team/add-team.component';
import { AllTeamComponent } from './components/team-package/web-service/all-team/all-team.component';
import { AllShiftComponent } from './components/shift-package/web-service/all-shift/all-shift.component';
import { AddShiftComponent } from './components/shift-package/web-service/add-shift/add-shift.component';
import { TemplateProblemComponent } from './components/problem-package/template-problem/template-problem.component';
import { HomeLeaderComponent } from './components/problem-package/leader/home-leader/home-leader.component';
import { AllProblemActionComponent } from './components/problem-package/leader/web-service/all-problem-action/all-problem-action.component';
import { IssueSearchComponent } from './components/issue-package/web-services/issue-search/issue-search.component';
import { AddBatteryUsageComponent } from './components/battery-usage-package/web-service/add-battery-usage/add-battery-usage.component';
import { CartTemplateComponent } from './components/cart-package/cart-template/cart-template.component';
import { TaurusTemplateComponent } from './components/taurus-package/taurus-template/taurus-template.component';
import { BatteryTemplateComponent } from './components/battery-package/battery-template/battery-template.component';
import { AllTaurusComponent } from './components/taurus-package/web-services/all-taurus/all-taurus.component';


@NgModule({
  declarations: [
    AppComponent,
    RemoveBatteryComponent,
    UpdateBatteryComponent,
    RemoveUserComponent,
    AllIssueComponent,
    UpdateIssueComponent,
    RemoveIssueComponent,
    RemoveActionCarriedOutComponent,
    UpdateActionCarriedOutComponent,
    AddActionCarriedOutComponent,
    AllActionCarriedOutComponent,
    AllUsageComponent,
    AddTaurusComponent,
    AllPickupComponent,
    AllSessionComponent,
    AddAccountTeamComponent,
    AllAccountTeamComponent,
    DeleteAccountTeamComponent,
    AddTeamComponent,
    AllTeamComponent,
    AllShiftComponent,
    AddShiftComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeMModule,
    LoginMModule,
    DashboardMModule,
    CartMModule,
    SuiviMModule, 
    UserMModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
