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

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: 'cart', component: CartComponent },
      { path: 'suivi', component : SuiviComponent},
      { path: 'add-taurus-usage', component : AddUsageComponent},
      { path: 'add-new-cart', component: AddCartComponent },
      { path: 'add-new-battery', component : AddBatteryComponent},
      { path: 'add-new-issue', component : AddIssueComponent},
      { path: 'admin-template', component : TemplateComponent},
      { path: 'user-home', component : UserHomeComponent},
      { path: 'all-users', component: AllUserComponent},
      { path: 'update-user/:id', component: UpdateUserComponent }

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
