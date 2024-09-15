import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';
import { LoginComponent } from './authenticate/login/login.component';
import { DashboardComponent } from './components/dashboard-global/dashboard/dashboard.component';
import { CartComponent } from './components/cart-package/cart-dashboard/cart.component';
import { AllCartComponent } from './components/cart-package/web-services/all-cart/all-cart.component';
import { AddCartComponent } from './components/cart-package/web-services/add-cart/add-cart.component';
import { SuiviComponent } from './components/suivi-dashboard/suivi/suivi.component';
import { AddUserComponent } from './components/user-package/web-services/add-user/add-user.component';
import { GetAccountByIdComponent } from './components/user-package/web-services/get-account-by-id/get-account-by-id.component';
import { ResumeComponent } from './components/view-web-service/resume/resume.component';
import { AddBatteryComponent } from './components/battery-package/web-services/add-battery/add-battery.component';
import { AddUsageComponent } from './components/taurus-package/web-services/taurus-usage/add-usage/add-usage.component';
import { AddIssueComponent } from './components/issue-package/web-services/add-issue/add-issue.component';
import { HistoricalComponent } from './components/view-web-service/chronology/historical/historical.component';
import { AuthGuard } from './authenticate/protect-route/auth.guard';
import { TemplateComponent } from './components/admin-package/component/template/template.component';
import { UserHomeComponent } from './components/user-package/user-home/user-home.component';
import { AllUserComponent } from './components/user-package/web-services/all-user/all-user.component';
import { UpdateUserComponent } from './components/user-package/web-services/update-user/update-user.component';
import { TemplateProblemComponent } from './components/problem-package/template-problem/template-problem.component';
import { HomeLeaderComponent } from './components/problem-package/leader/home-leader/home-leader.component';
import { AllProblemActionComponent } from './components/problem-package/leader/web-service/all-problem-action/all-problem-action.component';
import { IssueSearchComponent } from './components/issue-package/web-services/issue-search/issue-search.component';
import { AddPickupComponent } from './components/pickup-package/web-services/add-pickup/add-pickup.component';
import { AddBatteryUsageComponent } from './components/battery-usage-package/web-service/add-battery-usage/add-battery-usage.component';
import { CartTemplateComponent } from './components/cart-package/cart-template/cart-template.component';
import { BatteryTemplateComponent } from './components/battery-package/battery-template/battery-template.component';
import { TaurusTemplateComponent } from './components/taurus-package/taurus-template/taurus-template.component';
import { AddTaurusComponent } from './components/taurus-package/web-services/taurus/add-taurus/add-taurus.component';
import { AllBatteryComponent } from './components/battery-package/web-services/all-battery/all-battery.component';
import { AllTaurusComponent } from './components/taurus-package/web-services/all-taurus/all-taurus.component';
import { AddActionCarriedOutComponent } from './components/action-carried-out-package/web-services/add-action-carried-out/add-action-carried-out.component';
import { AllActionCarriedOutComponent } from './components/action-carried-out-package/web-services/all-action-carried-out/all-action-carried-out.component';
import { AddWareHouseComponent } from './components/ware-house-package/web-services/add-ware-house/add-ware-house.component';
import { AllWareHouseComponent } from './components/ware-house-package/web-services/all-ware-house/all-ware-house.component';
import { WareHouseTemplateComponent } from './components/ware-house-package/ware-house-template/ware-house-template.component';
import { AddServiceBeanComponent } from './components/service-bean-package/web-services/add-service-bean/add-service-bean.component';
import { AllServiceBeanComponent } from './components/service-bean-package/web-services/all-service-bean/all-service-bean.component';
import { ServiceBeanTemplateComponent } from './components/service-bean-package/service-bean-template/service-bean-template.component';
import { AddManufacturerComponent } from './components/manufacturer-package/web-services/add-manufacturer/add-manufacturer.component';
import { ManufacturerTemplateComponent } from './components/manufacturer-package/manufacturer-template/manufacturer-template.component';
import { AllManufacturerComponent } from './components/manufacturer-package/web-services/all-manufacturer/all-manufacturer.component';
import { FuelTypeTemplateComponent } from './components/fuel-type-package/fuel-type-template/fuel-type-template.component';
import { CartCategoryTemplateComponent } from './components/cart-category-bean-package/cart-category-template/cart-category-template.component';
import { AddCartCategoryComponent } from './components/cart-category-bean-package/web-services/add-cart-category/add-cart-category.component';
import { AddFuelTypeComponent } from './components/fuel-type-package/web-services/add-fuel-type/add-fuel-type.component';
import { AllCartCategoryComponent } from './components/cart-category-bean-package/web-services/all-cart-category/all-cart-category.component';
import { AllFuelTypeComponent } from './components/fuel-type-package/web-services/all-fuel-type/all-fuel-type.component';
import { SaisineSuivisComponent } from './components/admin-package/component/saisine-suivis/saisine-suivis.component';
import { AllPickupComponent } from './components/pickup-package/web-services/all-pickup/all-pickup.component';
import { DetailPickupComponent } from './components/pickup-package/web-services/detail-pickup/detail-pickup.component';
import { DetailUsageComponent } from './components/taurus-package/web-services/taurus-usage/detail-usage/detail-usage.component';
import { AllUsageComponent } from './components/taurus-package/web-services/taurus-usage/all-usage/all-usage.component';
import { AllBatteryUsageComponent } from './components/battery-usage-package/web-service/all-battery-usage/all-battery-usage.component';
import { DetailBatteryUsageComponent } from './components/battery-usage-package/web-service/detail-battery-usage/detail-battery-usage.component';
import { DetailIssueComponent } from './components/issue-package/web-services/detail-issue/detail-issue.component';
import { AllIssueComponent } from './components/issue-package/web-services/all-issue/all-issue.component';
import { AllAccountTeamComponent } from './components/account-team-package/web-service/all-account-team/all-account-team.component';
import { DetailAccountTeamComponent } from './components/account-team-package/web-service/detail-account-team/detail-account-team.component';
import { AllSessionComponent } from './components/work-session-package/web-service/all-session/all-session.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'cart', component: CartComponent },
      { path: 'suivi', component : SuiviComponent},
      { path: 'add-taurus-usage', component : AddUsageComponent},
      { path: 'add-new-pickup', component: AddPickupComponent },
      { path: 'add-new-battery-usage', component : AddBatteryUsageComponent},
      { path: 'add-new-issue', component : AddIssueComponent},
      { path: 'add-cart', component : AddCartComponent},
      { path: 'add-battery', component : AddBatteryComponent},
      { path: 'add-taurus', component : AddTaurusComponent},
      { path: 'add-new-action-carried-out', component : AddActionCarriedOutComponent},
      { path: 'add-new-ware-house', component : AddWareHouseComponent},
      { path: 'add-new-service-bean', component : AddServiceBeanComponent},
      { path: 'add-new-manufacturer', component : AddManufacturerComponent},
      { path: 'add-new-cart-category', component : AddCartCategoryComponent},
      { path: 'add-new-fuel-type', component : AddFuelTypeComponent},
      { path: 'admin-template', component : TemplateComponent},
      { path: 'saisine-suivis', component : SaisineSuivisComponent},
      { path: 'user-home', component : UserHomeComponent},
      { path: 'all-users', component: AllUserComponent},
      { path: 'update-user/:id', component: UpdateUserComponent },
      { path: 'problem-template', component: TemplateProblemComponent},
      { path: 'leader-home', component: HomeLeaderComponent},
      { path: 'all-issue-action', component: AllProblemActionComponent},
      { path: 'all-cart', component : AllCartComponent},
      { path: 'all-battery', component : AllBatteryComponent},
      { path: 'all-taurus', component : AllTaurusComponent},
      { path: 'all-action-carried-out', component : AllActionCarriedOutComponent},
      { path: 'all-ware-house', component : AllWareHouseComponent},
      { path: 'all-service-bean', component : AllServiceBeanComponent},
      { path: 'all-manufacturer', component : AllManufacturerComponent},
      { path: 'all-cart-category', component : AllCartCategoryComponent},
      { path: 'all-fuel-type', component : AllFuelTypeComponent},
      { path: 'all-pickups', component : AllPickupComponent},
      { path: 'all-taurus-usage', component : AllUsageComponent},
      { path: 'all-battery-usage', component : AllBatteryUsageComponent},
      { path: 'all-issue', component : AllIssueComponent},
      { path: 'all-account-team', component : AllAccountTeamComponent},
      { path: 'all-work-session', component : AllSessionComponent},
      { path: 'issue-search', component: IssueSearchComponent},
      { path: 'cart-template', component: CartTemplateComponent},
      { path: 'battery-template', component : BatteryTemplateComponent},
      { path: 'taurus-template', component : TaurusTemplateComponent},
      { path: 'ware-house-template', component : WareHouseTemplateComponent},
      { path: 'service-bean-template', component : ServiceBeanTemplateComponent},
      { path: 'manufacturer-template', component : ManufacturerTemplateComponent},
      { path: 'fuel-type-template', component : FuelTypeTemplateComponent},
      { path: 'cart-category-template', component : CartCategoryTemplateComponent},
      { path: 'detail-pickup/:id', component : DetailPickupComponent},
      { path: 'detail-usage/:id', component : DetailUsageComponent},
      { path: 'detail-battery-usage', component : DetailBatteryUsageComponent},
      { path: 'detail-issue/:id', component : DetailIssueComponent},
      { path: 'detail-account-team', component : DetailAccountTeamComponent}

    ]
  },
  { path: 'all-cart', component: AllCartComponent, canActivate : [AuthGuard] },
  { path: '*', redirectTo: 'home' },
  { path: 'add-info-user', component : AddUserComponent, canActivate : [AuthGuard]},
  { path: 'get-account-by-id', component : GetAccountByIdComponent, canActivate : [AuthGuard]},
  { path: 'resume', component : ResumeComponent, canActivate : [AuthGuard]},
  { path: 'all-taurus-by-account', component : HistoricalComponent, canActivate : [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
