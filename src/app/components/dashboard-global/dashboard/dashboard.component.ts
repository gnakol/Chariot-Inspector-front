import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  @ViewChild('drawer') drawer! : MatDrawer;

  toggleDrawer() {
    this.drawer.toggle();
  }

  logout()
  {
    console.log("out");
  }

}
