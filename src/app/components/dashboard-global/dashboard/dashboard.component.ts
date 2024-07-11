import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '../../../authenticate/core/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @ViewChild('drawer') drawer! : MatDrawer;

  constructor(private authService : AuthService){}

  toggleDrawer() {
    this.drawer.toggle();
  }

  logout()
  {
    this.authService.logout();
  }

}
