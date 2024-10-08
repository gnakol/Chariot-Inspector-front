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
import { AddFuelTypeComponent } from './components/fuel-type-package/web-services/add-fuel-type/add-fuel-type.component';
import { AllFuelTypeComponent } from './components/fuel-type-package/web-services/all-fuel-type/all-fuel-type.component';
import { AllCartCategoryComponent } from './components/cart-category-bean-package/web-services/all-cart-category/all-cart-category.component';
import { AddCartCategoryComponent } from './components/cart-category-bean-package/web-services/add-cart-category/add-cart-category.component';
import { AddManufacturerComponent } from './components/manufacturer-package/web-services/add-manufacturer/add-manufacturer.component';
import { AllManufacturerComponent } from './components/manufacturer-package/web-services/all-manufacturer/all-manufacturer.component';
import { ManufacturerTemplateComponent } from './components/manufacturer-package/manufacturer-template/manufacturer-template.component';
import { FuelTypeTemplateComponent } from './components/fuel-type-package/fuel-type-template/fuel-type-template.component';
import { CartCategoryTemplateComponent } from './components/cart-category-bean-package/cart-category-template/cart-category-template.component';
import { UpdateCartComponent } from './components/cart-package/web-services/update-cart/update-cart.component';
import { DetailPickupComponent } from './components/pickup-package/web-services/detail-pickup/detail-pickup.component';
import { RemovePickupComponent } from './components/pickup-package/web-services/remove-pickup/remove-pickup.component';
import { SearchPickupComponent } from './components/pickup-package/web-services/search-pickup/search-pickup.component';
import { SaisineSuivisComponent } from './components/admin-package/component/saisine-suivis/saisine-suivis.component';
import { DetailUsageComponent } from './components/taurus-package/web-services/taurus-usage/detail-usage/detail-usage.component';
import { AllBatteryUsageComponent } from './components/battery-usage-package/web-service/all-battery-usage/all-battery-usage.component';
import { DetailBatteryUsageComponent } from './components/battery-usage-package/web-service/detail-battery-usage/detail-battery-usage.component';
import { UpdateBatteryUsageComponent } from './components/battery-usage-package/web-service/update-battery-usage/update-battery-usage.component';
import { DetailIssueComponent } from './components/issue-package/web-services/detail-issue/detail-issue.component';
import { DetailAccountTeamComponent } from './components/account-team-package/web-service/detail-account-team/detail-account-team.component';
import { AddAuditComponent } from './components/audit-package/web-services/add-audit/add-audit.component';
import { AllAuditComponent } from './components/audit-package/web-services/all-audit/all-audit.component';
import { AuditTemplateComponent } from './components/audit-package/audit-template/audit-template.component';


@NgModule({
  declarations: [
    AppComponent,
    RemoveBatteryComponent,
    UpdateBatteryComponent,
    RemoveUserComponent,
    RemoveIssueComponent,
    RemoveActionCarriedOutComponent,
    UpdateActionCarriedOutComponent,
    AddTaurusComponent,
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
