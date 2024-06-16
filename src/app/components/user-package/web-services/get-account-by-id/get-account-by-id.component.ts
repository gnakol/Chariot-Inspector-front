import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../../../authenticate/core/auth.service';

@Component({
  selector: 'app-get-account-by-id',
  templateUrl: './get-account-by-id.component.html',
  styleUrls: ['./get-account-by-id.component.scss']
})
export class GetAccountByIdComponent implements OnInit {

  user: any;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = this.authService.parseJwt(token);
        const email = payload.sub;
        console.log('Extracted Email:', email);
        this.userService.getUserIdByEmail(email).subscribe(
          userIdResponse => {
            console.log('User ID Response:', userIdResponse);
            const userId = userIdResponse; // Directement obtenir l'ID utilisateur
            console.log('User ID:', userId);
            this.userService.getAccountById(userId).subscribe(
              data => {
                console.log('User Data:', data);
                this.user = data;
              },
              error => {
                console.error('Error loading user data:', error);
              }
            );
          },
          error => {
            console.error('Error fetching user ID by email:', error);
          }
        );
      } catch (error) {
        console.error('Error extracting user ID from token:', error);
      }
    }
  }
}
