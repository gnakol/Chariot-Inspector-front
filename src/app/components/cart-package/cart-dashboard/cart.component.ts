import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../authenticate/core/auth.service';
import { UserService } from '../../user-package/service/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(
    private route : Router,
    private authService : AuthService,
    private accountService : UserService
  ){}

  allCart()
  {
    this.route.navigateByUrl("/all-cart");
  }

  createCart(){

    const token = this.authService.getToken();
    
    if(token)
    {
      const email = this.authService.getEmailFromToken(token);
      
      this.accountService.getUserIdByEmail(email).subscribe(userId => {
        this.authService.startWorkSession(userId).subscribe(workSessionId => {
          localStorage.setItem('workSessionId', workSessionId);
          console.log('Work Session ID stored in localStorage:', workSessionId);
          this.route.navigateByUrl("/dashboard/suivi");
        }, error => {
          console.error('Failed to start work session:', error);
        });
      }, error => {
        console.error('Failed to get user ID:', error);
      });
    } else {
      console.error('No token found in local storage');
    }

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