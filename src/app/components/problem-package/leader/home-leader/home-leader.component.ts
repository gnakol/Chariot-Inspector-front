import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-leader',
  templateUrl: './home-leader.component.html',
  styleUrl: './home-leader.component.scss'
})
export class HomeLeaderComponent {

  constructor(
    private route : Router
  ){}

  allCart()
  {
    this.route.navigateByUrl("/dashboard/all-action-carried-out");
  }

  createActionCarridOut(){

    this.route.navigateByUrl("/dashboard/issue-search");

  }

  updateCart(){

    this.route.navigateByUrl("/all-taurus-by-account");

  }

  deleteCart(){

  }

  searchCart(){

    this.route.navigateByUrl("/get-account-by-id");
  }

}
