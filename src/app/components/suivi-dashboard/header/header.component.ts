import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router : Router)
  {

  }

  home(){

    this.router.navigateByUrl("/home");
  }

  dashboard()
  {
    this.router.navigateByUrl("/dashboard");
  }

  login()
  {
    this.router.navigateByUrl("/login");
  }

}
